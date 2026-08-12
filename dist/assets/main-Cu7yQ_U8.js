import{i as h}from"./auth-BsRFV8R9.js";import{s as $,a as p}from"./firebase-DV4sE05K.js";document.addEventListener("DOMContentLoaded",async()=>{h(),await $();let i=0;p(l=>{i=l.length;const s=document.getElementById("totalAppointmentsCount");s&&(s.textContent=i.toString());const d=document.getElementById("newPatientsCount");d&&(d.textContent=i.toString());const r=document.getElementById("urgentCasesCount");if(r){const e=l.filter(n=>(n.status||"").toLowerCase().includes("perhatian")||(n.status||"").toLowerCase().includes("kritis")).length;r.textContent=(e||1).toString()}const f=document.getElementById("completedVisitsCount");if(f){const e=l.filter(n=>(n.status||"").toLowerCase().includes("sehat")).length;f.textContent=e.toString()}u(l)});const o=document.getElementById("refreshQueueBtn");o&&o.addEventListener("click",()=>{p(l=>u(l))}),g()});function u(i){const o=document.getElementById("liveQueueTableBody");if(!o)return;if(i.length===0){o.innerHTML=`
      <tr>
        <td colspan="4" class="py-6 text-center text-slate-400 text-xs font-medium">
          Tidak ada antrian pasien saat ini.
        </td>
      </tr>
    `;return}const l=i.slice(0,5);o.innerHTML=l.map(s=>{let d='<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Menunggu</span>';const r=(s.status||"").toLowerCase();r.includes("sehat")?d='<span class="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Sehat</span>':r.includes("pemulihan")?d='<span class="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Pemulihan</span>':r.includes("perhatian")&&(d='<span class="px-2.5 py-1 rounded-full bg-red-100 text-red-800 text-[10px] font-bold">Perlu Perhatian</span>');const f=s.doctor_name||"Dr. Sarah Jenkins",e=s.last_visit?"12 min":"5 min";return`
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="py-3 px-4">
          <a href="patient.html?id=${s.id}" class="flex items-center gap-2.5 font-bold text-slate-900 hover:text-emerald-800">
            <span class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px] flex items-center justify-center shrink-0">
              ${s.name.slice(0,2).toUpperCase()}
            </span>
            <div>
              <p class="leading-tight">${s.name}</p>
              <p class="text-[10px] font-normal text-slate-400">${s.species} · ${s.owner_name}</p>
            </div>
          </a>
        </td>
        <td class="py-3 px-4">${d}</td>
        <td class="py-3 px-4 font-semibold text-slate-700">${f}</td>
        <td class="py-3 px-4 font-mono text-slate-500 text-[11px]">${e}</td>
      </tr>
    `}).join("")}function g(){const i=document.getElementById("dynamicTrendChart");if(!i)return;const o=["Sen","Sel","Rab","Kam","Jum","Sab","Min"],l=[25,29,35,22,28,38,15],s=[14,12,10,8,13,19,6],d=46,r=[40,110,180,250,320,390,460],f=t=>210-t/d*180,e=l.map((t,a)=>({x:r[a],y:f(t),val:t,day:o[a]})),n=s.map((t,a)=>({x:r[a],y:f(t),val:t,day:o[a]}));let c=`M ${e[0].x},${e[0].y}`;for(let t=0;t<e.length-1;t++){const a=(e[t].x+e[t+1].x)/2;c+=` C ${a},${e[t].y} ${a},${e[t+1].y} ${e[t+1].x},${e[t+1].y}`}const y=`${c} L ${e[e.length-1].x},210 L ${e[0].x},210 Z`;let x=`M ${n[0].x},${n[0].y}`;for(let t=0;t<n.length-1;t++){const a=(n[t].x+n[t+1].x)/2;x+=` C ${a},${n[t].y} ${a},${n[t+1].y} ${n[t+1].x},${n[t+1].y}`}const m=`${x} L ${n[n.length-1].x},210 L ${n[0].x},210 Z`;i.innerHTML=`
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
      <path d="${y}" fill="url(#gradKonsultasi)" />
      <path d="${m}" fill="url(#gradRanap)" />

      <!-- Lines -->
      <path d="${c}" fill="none" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round"/>
      <path d="${x}" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Dots & Values for Konsultasi -->
      ${e.map(t=>`
        <circle cx="${t.x}" cy="${t.y}" r="3.5" fill="#0f172a" stroke="#ffffff" stroke-width="1.5"/>
      `).join("")}

      <!-- Dots & Values for Rawat Inap -->
      ${n.map(t=>`
        <circle cx="${t.x}" cy="${t.y}" r="3.5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5"/>
      `).join("")}

      <!-- Day Labels -->
      ${o.map((t,a)=>`
        <text x="${r[a]}" y="228" fill="#94a3b8" font-size="10" font-weight="500" text-anchor="middle">${t}</text>
      `).join("")}
    </svg>
  `}
