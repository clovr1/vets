import{i as $}from"./auth-BsRFV8R9.js";import{s as k,a as S,x as C,C as P,B as L,D as R,k as D}from"./firebase-DV4sE05K.js";let x=[],E=[];document.addEventListener("DOMContentLoaded",async()=>{$(),await k(),window.lucide&&window.lucide.createIcons(),S(i=>{E=i,M(i)}),C(i=>{x=i,_(i),b()}),N();const n=document.getElementById("searchPrescriptionInput"),e=document.getElementById("filterStatusSelect");n&&n.addEventListener("input",()=>b()),e&&e.addEventListener("change",()=>b()),T();const a=new URLSearchParams(window.location.search).get("patient_id");a&&setTimeout(()=>{I(a)},500)});function _(n){const e=n.filter(o=>o.status==="Active").length,s=n.filter(o=>o.status==="Selesai").length,a=n.length,i=document.getElementById("statActivePrescriptions"),r=document.getElementById("statCompletedPrescriptions"),t=document.getElementById("statTotalPrescriptions");i&&(i.textContent=String(e)),r&&(r.textContent=String(s)),t&&(t.textContent=String(a))}function b(){var i,r;const n=document.getElementById("prescriptionsContainer");if(!n)return;const e=((i=document.getElementById("searchPrescriptionInput"))==null?void 0:i.value.toLowerCase().trim())||"",s=((r=document.getElementById("filterStatusSelect"))==null?void 0:r.value)||"All";let a=x.filter(t=>{const o=(t.patient_name||"").toLowerCase().includes(e)||(t.patient_code||"").toLowerCase().includes(e)||(t.prescription_number||"").toLowerCase().includes(e)||(t.owner_name||"").toLowerCase().includes(e)||(t.items||[]).some(l=>l.med_name.toLowerCase().includes(e)),c=s==="All"||t.status===s;return o&&c});if(a.length===0){n.innerHTML=`
      <div class="col-span-full bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400 space-y-2">
        <i data-lucide="pill" class="w-10 h-10 mx-auto text-slate-300"></i>
        <p class="font-bold text-slate-700 text-sm">Tidak ada resep obat ditemukan</p>
        <p class="text-xs">Coba sesuaikan kata kunci pencarian atau buat resep obat baru.</p>
      </div>
    `,window.lucide&&window.lucide.createIcons();return}n.innerHTML=a.map(t=>{const o=t.status==="Active"?"bg-emerald-100 text-emerald-800 border-emerald-200":t.status==="Selesai"?"bg-slate-100 text-slate-700 border-slate-200":"bg-rose-100 text-rose-800 border-rose-200",c=(t.items||[]).map(l=>`
      <div class="flex items-start justify-between py-1 text-xs border-b border-slate-100 last:border-0">
        <div>
          <span class="font-bold text-slate-800 block">${l.med_name}</span>
          <span class="text-[11px] text-slate-500">${l.instructions||""}</span>
        </div>
        <span class="font-semibold text-slate-700 text-right shrink-0 ml-2 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[11px]">${l.dosage}</span>
      </div>
    `).join("");return`
      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition-all space-y-4 flex flex-col justify-between">
        <div>
          <!-- Card Top Bar -->
          <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold text-xs text-slate-900">${t.prescription_number||"RX-000"}</span>
                <span class="text-[11px] text-slate-400">&middot; ${t.date||""}</span>
              </div>
              <h3 class="serif-title font-bold text-base text-slate-900 mt-1">${t.patient_name||"Pasien"}</h3>
              <p class="text-xs text-slate-500">${t.species||""} &middot; Pemilik: ${t.owner_name||"-"}</p>
            </div>

            <!-- Status Dropdown / Badge -->
            <div class="relative inline-block">
              <select onchange="handleRxStatusChange('${t.id}', this.value)" title="Ubah Status Resep" 
                      class="appearance-none cursor-pointer pl-3 pr-6 py-1 rounded-full text-xs font-semibold focus:outline-none transition-all shadow-xs border ${o}">
                <option value="Active" ${t.status==="Active"?"selected":""}>Active</option>
                <option value="Selesai" ${t.status==="Selesai"?"selected":""}>Selesai</option>
                <option value="Dibatalkan" ${t.status==="Dibatalkan"?"selected":""}>Dibatalkan</option>
              </select>
            </div>
          </div>

          <!-- Items list -->
          <div class="py-2 space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Rincian Obat (${t.duration||"7 Hari"}):</span>
            <div class="bg-slate-50 border border-slate-100 rounded-xl p-3">
              ${c||'<span class="text-xs text-slate-400">Tidak ada rincian item.</span>'}
            </div>
          </div>

          ${t.notes?`<p class="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100 mt-2">📌 ${t.notes}</p>`:""}
        </div>

        <!-- Card Footer Actions -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[11px] text-slate-500">Dr: ${t.doctor_name||"Dr. Sarah Jenkins"}</span>
          <div class="flex items-center gap-2">
            <button onclick="openRxPreviewModal('${t.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1">
              👁️ Lihat / Cetak
            </button>
            <button onclick="handleDeleteRx('${t.id}')" class="p-1.5 text-slate-400 hover:text-rose-600 transition-colors" title="Hapus Resep">
              🗑️
            </button>
          </div>
        </div>
      </div>
    `}).join(""),window.lucide&&window.lucide.createIcons()}function M(n){const e=document.getElementById("rxPatientSelect");if(!e)return;const s=e.value;e.innerHTML='<option value="" disabled selected>-- Pilih sesuai dengan apa yang ingin Anda pilih --</option>'+n.map(a=>`
      <option value="${a.id}">${a.name} (${a.species} - ${a.breed}) - Pemilik: ${a.owner_name}</option>
    `).join(""),s&&(e.value=s)}async function N(){const n=await P(),e=document.getElementById("rxDoctorSelect");e&&n.length>0&&(e.innerHTML='<option value="" disabled selected>-- Pilih Dokter --</option>'+n.map(s=>`<option value="${s.name}">${s.name} (${s.specialization})</option>`).join(""))}function T(){const n=document.getElementById("openNewPrescriptionBtn"),e=document.getElementById("newPrescriptionModal"),s=document.getElementById("closeNewPrescriptionModalX"),a=document.getElementById("cancelRxModalBtn"),i=document.getElementById("createPrescriptionForm"),r=document.getElementById("addRxItemBtn");n&&n.addEventListener("click",()=>I()),s&&s.addEventListener("click",()=>e==null?void 0:e.classList.add("hidden")),a&&a.addEventListener("click",()=>e==null?void 0:e.classList.add("hidden"));const t=document.getElementById("viewRxModal"),o=document.getElementById("closeViewRxModalX"),c=document.getElementById("printRxBtn");o&&o.addEventListener("click",()=>t==null?void 0:t.classList.add("hidden")),c&&c.addEventListener("click",()=>window.print()),r&&r.addEventListener("click",()=>g()),i&&i.addEventListener("submit",async l=>{l.preventDefault(),await A()})}function I(n){const e=document.getElementById("newPrescriptionModal"),s=document.getElementById("rxPatientSelect"),a=document.getElementById("rxNumberInput");if(s&&n&&(s.value=n),a){const r=x.length+1;a.value=`RX-2025-${String(r).padStart(3,"0")}`}const i=document.getElementById("rxItemsContainer");i&&(i.innerHTML="",g("Amoxicillin 250mg","2x1 hari","Sesudah makan"),g("Vitamin & Suplemen","1x1 hari","Campur ke makanan")),e==null||e.classList.remove("hidden")}function g(n="",e="",s=""){const a=document.getElementById("rxItemsContainer");if(!a)return;const i=`rx_item_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,r=document.createElement("div");r.id=i,r.className="grid grid-cols-12 gap-2 items-center bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs",r.innerHTML=`
    <div class="col-span-5">
      <input type="text" placeholder="Nama Obat / Racikan *" required value="${n}" 
             class="rx-med-name w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vetgreen-800">
    </div>
    <div class="col-span-3">
      <input type="text" placeholder="Dosis (e.g. 2x1)" required value="${e}" 
             class="rx-med-dosage w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vetgreen-800">
    </div>
    <div class="col-span-3">
      <input type="text" placeholder="Aturan Pakai / Ket" value="${s}" 
             class="rx-med-instructions w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vetgreen-800">
    </div>
    <div class="col-span-1 text-right">
      <button type="button" onclick="removeRxItemRow('${i}')" class="text-slate-400 hover:text-rose-600 transition-colors" title="Hapus Baris">✕</button>
    </div>
  `,a.appendChild(r)}window.removeRxItemRow=n=>{const e=document.getElementById(n);e&&e.remove()};async function A(){var m,u;const n=document.getElementById("rxPatientSelect"),e=document.getElementById("rxDoctorSelect"),s=document.getElementById("rxNumberInput"),a=document.getElementById("rxDurationSelect"),i=document.getElementById("rxNotesInput"),r=document.getElementById("saveRxBtn");if(!n||!n.value){alert("Mohon pilih pasien terlebih dahulu.");return}const t=n.value,o=E.find(d=>d.id===t),c=document.querySelectorAll("#rxItemsContainer > div"),l=[];if(c.forEach(d=>{var w,y,h;const p=(w=d.querySelector(".rx-med-name"))==null?void 0:w.value.trim(),f=(y=d.querySelector(".rx-med-dosage"))==null?void 0:y.value.trim(),B=((h=d.querySelector(".rx-med-instructions"))==null?void 0:h.value.trim())||"";p&&f&&l.push({med_name:p,dosage:f,instructions:B})}),l.length===0){alert("Mohon tambahkan minimal 1 jenis obat dalam resep.");return}r&&(r.disabled=!0,r.innerHTML="⏳ Menyimpan...");try{const d={patient_id:t,patient_name:(o==null?void 0:o.name)||"Pasien",patient_code:(o==null?void 0:o.code)||"#VET-000",species:`${(o==null?void 0:o.species)||""} (${(o==null?void 0:o.breed)||""})`,owner_name:(o==null?void 0:o.owner_name)||"-",doctor_name:(e==null?void 0:e.value)||"Dr. Sarah Jenkins",prescription_number:(s==null?void 0:s.value.trim())||`RX-${Date.now()}`,date:new Date().toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}),duration:(a==null?void 0:a.value)||"7 Hari",status:"Active",notes:(i==null?void 0:i.value.trim())||"",items:l};await L(d),v("E-Resep berhasil diterbitkan & disinkronkan ke rekam medis pasien!"),(m=document.getElementById("newPrescriptionModal"))==null||m.classList.add("hidden"),(u=document.getElementById("createPrescriptionForm"))==null||u.reset()}catch(d){console.error("Failed to save prescription:",d),alert("Gagal menyimpan resep. Coba lagi.")}finally{r&&(r.disabled=!1,r.innerHTML='<i data-lucide="check" class="w-4 h-4"></i> Simpan & Terbitkan Resep',window.lucide&&window.lucide.createIcons())}}window.handleRxStatusChange=async(n,e)=>{try{await R(n,e),v(`Status resep diperbarui menjadi "${e}"`)}catch(s){console.error("Error updating prescription status:",s)}};window.handleDeleteRx=async n=>{if(confirm("Apakah Anda yakin ingin menghapus resep obat ini?"))try{await D(n),v("Resep obat berhasil dihapus.")}catch(e){console.error("Error deleting rx:",e)}};window.openRxPreviewModal=n=>{const e=x.find(d=>d.id===n);if(!e)return;const s=document.getElementById("viewRxModal"),a=document.getElementById("previewRxNumber"),i=document.getElementById("previewRxDate"),r=document.getElementById("previewPatientName"),t=document.getElementById("previewPatientCode"),o=document.getElementById("previewOwnerName"),c=document.getElementById("previewDoctorName"),l=document.getElementById("previewRxItemsBody"),m=document.getElementById("previewRxNotes"),u=document.getElementById("previewDoctorSign");a&&(a.textContent=e.prescription_number||"RX-001"),i&&(i.textContent=e.date||""),r&&(r.textContent=`${e.patient_name||"Pasien"} (${e.species||""})`),t&&(t.textContent=`ID: ${e.patient_code||"-"}`),o&&(o.textContent=e.owner_name||"-"),c&&(c.textContent=`Dokter: ${e.doctor_name||"Dr. Sarah Jenkins"}`),u&&(u.textContent=e.doctor_name||"Dr. Sarah Jenkins"),m&&(m.textContent=`Durasi Pengobatan: ${e.duration||"7 Hari"}. ${e.notes?"Catatan: "+e.notes:""}`),l&&(l.innerHTML=(e.items||[]).map((d,p)=>`
      <tr>
        <td class="p-2 font-bold text-slate-500">${p+1}</td>
        <td class="p-2 font-bold text-slate-900">${d.med_name}</td>
        <td class="p-2 font-semibold text-slate-700 bg-slate-50">${d.dosage}</td>
        <td class="p-2 text-slate-600">${d.instructions||"-"}</td>
      </tr>
    `).join("")),s==null||s.classList.remove("hidden")};function v(n){const e=document.getElementById("toastNotification"),s=document.getElementById("toastMessage");e&&s&&(s.textContent=n,e.classList.remove("translate-y-20","opacity-0"),setTimeout(()=>{e.classList.add("translate-y-20","opacity-0")},3e3))}
