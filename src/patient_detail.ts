import { 
  getPatientById,
  addClinicalNote,
  updatePatientVitals,
  updatePatientStatus,
  Patient
} from './firebase';

let currentPatientId: string = '';
let currentPatient: Patient | null = null;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentPatientId = urlParams.get('id') || '';

  if (!currentPatientId) {
    alert("Pasien tidak ditemukan. Kembali ke daftar pasien.");
    window.location.href = "patients.html";
    return;
  }

  await loadPatientDetails(currentPatientId);

  // Handle Form Submit
  const intakeForm = document.getElementById('intakeForm') as HTMLFormElement | null;
  if (intakeForm) {
    intakeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleSaveIntake();
    });
  }
});

async function loadPatientDetails(patientId: string) {
  const patient = await getPatientById(patientId);
  if (!patient) return;
  currentPatient = patient;

  const nameElem = document.getElementById('patientName');
  if (nameElem) nameElem.textContent = patient.name;

  const metaElem = document.getElementById('patientMeta');
  if (metaElem) {
    metaElem.innerHTML = `${patient.species} &middot; ${patient.breed || '-'} &middot; ${patient.gender}`;
  }

  const statusElem = document.getElementById('patientStatus');
  if (statusElem) {
    statusElem.textContent = patient.status || 'MENUNGGU PEMERIKSAAN';
    updateStatusBadgeStyle(statusElem, patient.status || 'Menunggu Pemeriksaan');
  }

  const codeElem = document.getElementById('patientCode');
  if (codeElem) codeElem.textContent = patient.code || '#VET-000';

  const ageElem = document.getElementById('patientAge');
  if (ageElem) ageElem.textContent = patient.age;

  // Pre-fill Vitals if exist
  const weightInput = document.getElementById('vitalWeight') as HTMLInputElement;
  if (weightInput && patient.weight) weightInput.value = patient.weight.replace(' kg', '');

  const tempInput = document.getElementById('vitalTemp') as HTMLInputElement;
  if (tempInput && patient.temperature) tempInput.value = patient.temperature.replace(' °C', '');

  const hrInput = document.getElementById('vitalHr') as HTMLInputElement;
  if (hrInput && patient.heart_rate) hrInput.value = patient.heart_rate.replace(' bpm', '');
}

function updateStatusBadgeStyle(badgeElem: HTMLElement, status: string) {
  const baseClass = "inline-flex items-center px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ";
  const s = status.toLowerCase();
  
  if (s.includes('sehat') || s.includes('sembuh')) {
    badgeElem.className = baseClass + "bg-emerald-100 text-emerald-800";
  } else if (s.includes('pemulihan') || s.includes('perawatan') || s.includes('perlu perhatian')) {
    badgeElem.className = baseClass + "bg-amber-100 text-amber-800";
  } else {
    badgeElem.className = baseClass + "bg-rose-100 text-rose-800";
  }
}

async function handleSaveIntake() {
  if (!currentPatientId || !currentPatient) return;

  const visitTypeInput = document.getElementById('visitType') as HTMLInputElement;
  const weightInput = document.getElementById('vitalWeight') as HTMLInputElement;
  const tempInput = document.getElementById('vitalTemp') as HTMLInputElement;
  const hrInput = document.getElementById('vitalHr') as HTMLInputElement;
  const respInput = document.getElementById('vitalResp') as HTMLInputElement;
  const keluhanInput = document.getElementById('keluhanUtama') as HTMLTextAreaElement;
  const riwayatTerkiniInput = document.getElementById('riwayatTerkini') as HTMLTextAreaElement;
  const riwayatObatInput = document.getElementById('riwayatObat') as HTMLTextAreaElement;
  
  const saveBtn = document.getElementById('saveIntakeBtn') as HTMLButtonElement;

  const visitType = visitTypeInput?.value || 'REGULER';
  const weight = weightInput?.value.trim() ? `${weightInput.value.trim()} kg` : '';
  const temp = tempInput?.value.trim() ? `${tempInput.value.trim()} °C` : '';
  const hr = hrInput?.value.trim() ? `${hrInput.value.trim()} bpm` : '';
  
  const keluhan = keluhanInput?.value.trim();
  const riwayatTerkini = riwayatTerkiniInput?.value.trim();
  const riwayatObat = riwayatObatInput?.value.trim();

  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = `⏳ Menyimpan...`;
  }

  try {
    // 1. Add Clinical Note for this Intake
    let detailNote = `Tipe Kunjungan: ${visitType}\n\n`;
    if (riwayatTerkini) detailNote += `Riwayat Terkini:\n${riwayatTerkini}\n\n`;
    if (riwayatObat) detailNote += `Riwayat Obat & Vaksin:\n${riwayatObat}\n\n`;
    if (weight || temp || hr) {
       detailNote += `Vitals: ${weight || '-'} / ${temp || '-'} / ${hr || '-'}`;
    }

    await addClinicalNote({
      patient_id: currentPatientId,
      title: `Keluhan: ${keluhan}`,
      detail: detailNote.trim(),
      note_date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    });

    // 2. Update Patient Vitals
    if (weight || temp || hr) {
      await updatePatientVitals(currentPatientId, weight, temp, hr);
    }
    
    // 3. Update Patient Status based on Visit Type
    let newStatus = currentPatient.status;
    if (visitType === 'RANAP') {
        newStatus = 'Rawat Inap';
    } else {
        newStatus = 'Perlu Perhatian';
    }
    await updatePatientStatus(currentPatientId, newStatus);
    
    // 4. Update UI Status locally
    const statusElem = document.getElementById('patientStatus');
    if (statusElem) {
      statusElem.textContent = newStatus.toUpperCase();
      updateStatusBadgeStyle(statusElem, newStatus);
    }

    showToastNotification('Data Intake Pasien berhasil dikirim ke Dokter!');
    
    // Reset Form (Except Vitals)
    keluhanInput.value = '';
    riwayatTerkiniInput.value = '';
    riwayatObatInput.value = '';

  } catch (err) {
    console.error('Failed to save intake:', err);
    alert('Gagal menyimpan data intake pasien.');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<i data-lucide="save" class="w-4 h-4"></i> Simpan & Kirim ke Dokter`;
      if ((window as any).lucide) (window as any).lucide.createIcons();
    }
  }
}

function showToastNotification(msg: string) {
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  if (toast && toastText) {
    toastText.textContent = msg;
    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 3000);
  }
}
