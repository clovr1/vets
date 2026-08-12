import { 
  seedDatabaseIfEmpty, 
  subscribePatients, 
  subscribeMedicalRecords, 
  db 
} from './firebase';
import { initSidebarProfile } from './auth';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

document.addEventListener('DOMContentLoaded', async () => {
  initSidebarProfile();
  await seedDatabaseIfEmpty();

  // State
  let patientsCount = 0;

  // Subscribe to patients
  subscribePatients((patients) => {
    patientsCount = patients.length;

    // Update Top Stat Cards
    const totalAppt = document.getElementById('totalAppointmentsCount');
    if (totalAppt) totalAppt.textContent = patientsCount.toString();

    const newPatientsCount = document.getElementById('newPatientsCount');
    if (newPatientsCount) newPatientsCount.textContent = patientsCount.toString();

    const urgentCasesCount = document.getElementById('urgentCasesCount');
    if (urgentCasesCount) {
      const urgentCount = patients.filter(p => (p.status || '').toLowerCase().includes('perhatian') || (p.status || '').toLowerCase().includes('kritis')).length;
      urgentCasesCount.textContent = (urgentCount || 1).toString();
    }

    const completedVisitsCount = document.getElementById('completedVisitsCount');
    if (completedVisitsCount) {
      const completed = patients.filter(p => (p.status || '').toLowerCase().includes('sehat')).length;
      completedVisitsCount.textContent = completed.toString();
    }

    // Render Live Patient Queue
    renderLiveQueue(patients);
  });

  // Refresh Queue Button
  const refreshBtn = document.getElementById('refreshQueueBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      subscribePatients((patients) => renderLiveQueue(patients));
    });
  }

  // Render Dual Trend Line Chart (Gambar 1 style)
  renderDualTrendChart();
});

function renderLiveQueue(patients: any[]) {
  const tbody = document.getElementById('liveQueueTableBody');
  if (!tbody) return;

  if (patients.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="py-6 text-center text-slate-400 text-xs font-medium">
          Tidak ada antrian pasien saat ini.
        </td>
      </tr>
    `;
    return;
  }

  const queuePatients = patients.slice(0, 5);

  tbody.innerHTML = queuePatients.map(p => {
    let statusPill = `<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Menunggu</span>`;
    const st = (p.status || '').toLowerCase();
    if (st.includes('sehat')) {
      statusPill = `<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Sehat</span>`;
    } else if (st.includes('pemulihan')) {
      statusPill = `<span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Pemulihan</span>`;
    } else if (st.includes('perhatian')) {
      statusPill = `<span class="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">Perlu Perhatian</span>`;
    }

    const doctorName = p.doctor_name || 'Dr. Sarah Jenkins';
    const waitTime = p.last_visit ? '12 min' : '5 min';

    return `
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-4">
          <a href="patient.html?id=${p.id}" class="flex items-center gap-2.5 font-bold text-slate-900 hover:text-emerald-800">
            <span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center shrink-0">
              ${p.name.slice(0,2).toUpperCase()}
            </span>
            <div>
              <p class="leading-tight">${p.name}</p>
              <p class="text-[10px] font-normal text-slate-400">${p.species} · ${p.owner_name}</p>
            </div>
          </a>
        </td>
        <td class="py-3 px-4">${statusPill}</td>
        <td class="py-3 px-4 font-semibold text-slate-700">${doctorName}</td>
        <td class="py-3 px-4 font-mono text-slate-500 text-[11px]">${waitTime}</td>
      </tr>
    `;
  }).join('');
}

function renderDualTrendChart() {
  const container = document.getElementById('dynamicTrendChart');
  if (!container) return;

  // Chart data matching Gambar 1 (Sen, Sel, Rab, Kam, Jum, Sab, Min)
  const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  
  // Line 1: Konsultasi (Dark line)
  const konsultasiVals = [25, 29, 35, 22, 28, 38, 15];
  // Line 2: Rawat Inap (Orange line)
  const ranapVals = [14, 12, 10, 8, 13, 19, 6];

  const maxVal = 46;
  const xCoords = [40, 110, 180, 250, 320, 390, 460];

  // Map values to Y pixels (min 0 at y=210, max 46 at y=30)
  const getY = (val: number) => 210 - (val / maxVal) * 180;

  const pts1 = konsultasiVals.map((v, i) => ({ x: xCoords[i], y: getY(v), val: v, day: days[i] }));
  const pts2 = ranapVals.map((v, i) => ({ x: xCoords[i], y: getY(v), val: v, day: days[i] }));

  // Path 1
  let path1 = `M ${pts1[0].x},${pts1[0].y}`;
  for (let i = 0; i < pts1.length - 1; i++) {
    const cx = (pts1[i].x + pts1[i+1].x) / 2;
    path1 += ` C ${cx},${pts1[i].y} ${cx},${pts1[i+1].y} ${pts1[i+1].x},${pts1[i+1].y}`;
  }
  const area1 = `${path1} L ${pts1[pts1.length-1].x},210 L ${pts1[0].x},210 Z`;

  // Path 2
  let path2 = `M ${pts2[0].x},${pts2[0].y}`;
  for (let i = 0; i < pts2.length - 1; i++) {
    const cx = (pts2[i].x + pts2[i+1].x) / 2;
    path2 += ` C ${cx},${pts2[i].y} ${cx},${pts2[i+1].y} ${pts2[i+1].x},${pts2[i+1].y}`;
  }
  const area2 = `${path2} L ${pts2[pts2.length-1].x},210 L ${pts2[0].x},210 Z`;

  container.innerHTML = `
    <svg class="w-full h-full overflow-visible" viewBox="0 0 500 240" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradKonsultasi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="gradRanap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.20"/>
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <!-- Y Axis Grid Lines -->
      <line x1="30" y1="30" x2="470" y2="30" stroke="#f1f5f9" stroke-dasharray="3"/>
      <text x="22" y="33" fill="#cbd5e1" font-size="9" text-anchor="end">46</text>

      <line x1="30" y1="75" x2="470" y2="75" stroke="#f1f5f9" stroke-dasharray="3"/>
      <text x="22" y="78" fill="#cbd5e1" font-size="9" text-anchor="end">34</text>

      <line x1="30" y1="120" x2="470" y2="120" stroke="#f1f5f9" stroke-dasharray="3"/>
      <text x="22" y="123" fill="#cbd5e1" font-size="9" text-anchor="end">23</text>

      <line x1="30" y1="165" x2="470" y2="165" stroke="#f1f5f9" stroke-dasharray="3"/>
      <text x="22" y="168" fill="#cbd5e1" font-size="9" text-anchor="end">11</text>

      <line x1="30" y1="210" x2="470" y2="210" stroke="#e2e8f0"/>
      <text x="22" y="213" fill="#cbd5e1" font-size="9" text-anchor="end">0</text>

      <!-- Area Fills -->
      <path d="${area1}" fill="url(#gradKonsultasi)" />
      <path d="${area2}" fill="url(#gradRanap)" />

      <!-- Lines -->
      <path d="${path1}" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
      <path d="${path2}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Dots & Values for Konsultasi -->
      ${pts1.map(p => `
        <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#0f172a" stroke="#ffffff" stroke-width="1.5"/>
      `).join('')}

      <!-- Dots & Values for Rawat Inap -->
      ${pts2.map(p => `
        <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
      `).join('')}

      <!-- Day Labels -->
      ${days.map((d, i) => `
        <text x="${xCoords[i]}" y="228" fill="#94a3b8" font-size="10" font-weight="500" text-anchor="middle">${d}</text>
      `).join('')}
    </svg>
  `;
}

