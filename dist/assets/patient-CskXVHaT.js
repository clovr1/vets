import{i as P}from"./auth-BsRFV8R9.js";import{s as S,a as L,k as D,m as _,u as T,n as H,p as V,r as N,t as j,v as A,w as O,x as F,y as U,z as G,A as J,B as q}from"./firebase-DV4sE05K.js";let b="",l=null,B=[];document.addEventListener("DOMContentLoaded",async()=>{P(),await S();let e=new URLSearchParams(window.location.search).get("id");L(async i=>{if(i.length===0)return;(!e||!i.some(s=>s.id===e))&&(e=i[0].id||""),b=e;const d=document.getElementById("patientRxLink");d&&(d.href=`prescriptions.html?patient_id=${b}`),await $(b),W(b)});const n=document.getElementById("patientStatusSelect");n&&n.addEventListener("change",async()=>{if(!b)return;const i=n.value;k(n,i);try{await T(b,i),v(`Status pasien diperbarui menjadi "${i}"`)}catch(d){console.error("Failed to update status:",d)}});const a=document.getElementById("createPatientRxForm");a&&a.addEventListener("submit",async i=>{i.preventDefault(),await ae()});const o=document.getElementById("addVaccineForm");o&&o.addEventListener("submit",async i=>{i.preventDefault(),await ee()});const r=document.getElementById("revisitForm");r&&r.addEventListener("submit",async i=>{i.preventDefault(),await Q()})});function K(t){const e=document.getElementById("tabBtnMedicalHistory"),n=document.getElementById("tabBtnPrescriptions"),a=document.getElementById("tabBtnVaccinations"),o=document.getElementById("tabContentMedicalHistory"),r=document.getElementById("tabContentPrescriptions"),i=document.getElementById("tabContentVaccinations"),d="px-4 py-2 text-vetgreen-800 border-b-2 border-vetgreen-800 font-bold transition-all flex items-center gap-1.5 whitespace-nowrap",s="px-4 py-2 text-slate-500 hover:text-slate-800 border-b-2 border-transparent font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap";e&&(e.className=t==="medical"?d:s),n&&(n.className=t==="prescriptions"?d:s),a&&(a.className=t==="vaccinations"?d:s),o&&o.classList.toggle("hidden",t!=="medical"),r&&r.classList.toggle("hidden",t!=="prescriptions"),i&&i.classList.toggle("hidden",t!=="vaccinations"),window.lucide&&window.lucide.createIcons()}function k(t,e){const n="appearance-none cursor-pointer pl-3 pr-7 py-1 rounded-full text-xs font-semibold focus:outline-none transition-all shadow-xs border ",a=e.toLowerCase();a.includes("sehat")||a.includes("sembuh")?t.className=n+"bg-emerald-100 text-emerald-800 border-emerald-200":a.includes("pemulihan")||a.includes("perawatan")||a.includes("perlu perhatian")?t.className=n+"bg-amber-100 text-amber-800 border-amber-200":t.className=n+"bg-rose-100 text-rose-800 border-rose-200"}async function $(t){await H(t);const e=await V(t);if(!e)return;l=e,await N(t,e);const n=document.getElementById("patientName");n&&(n.textContent=e.name);const a=document.getElementById("patientAvatar");a&&(a.textContent=e.name.substring(0,2).toUpperCase());const o=document.getElementById("patientMeta");o&&(o.innerHTML=`${e.species} / ${e.breed||"-"} &middot; ${e.age} &middot; ${e.gender} &middot; <span class="font-mono text-slate-700">${e.code||"#VET-000"}</span>`);const r=document.getElementById("attendingDoctor");r&&(r.textContent=e.doctor_name||"Dr. Sarah Jenkins");const i=document.getElementById("ownerName");i&&(i.textContent=e.owner_name);const d=document.getElementById("ownerPhone");d&&(d.textContent=e.phone);const s=document.getElementById("ownerAddress");s&&(s.textContent=e.address||"-");const c=document.getElementById("ownerHeaderName");c&&(c.textContent=e.owner_name);const u=document.getElementById("ownerHeaderPhone");u&&(u.textContent=e.phone);const x=document.getElementById("topAddOtherPetBtn");if(x){const w=encodeURIComponent(e.owner_name||""),y=encodeURIComponent(e.phone||""),I=encodeURIComponent(e.address||"");x.href=`add_patient.html?existing_owner=1&owner_name=${w}&owner_phone=${y}&owner_address=${I}`}const m=document.getElementById("addOtherPetLink");if(m){const w=encodeURIComponent(e.owner_name||""),y=encodeURIComponent(e.phone||""),I=encodeURIComponent(e.address||"");m.href=`add_patient.html?existing_owner=1&owner_name=${w}&owner_phone=${y}&owner_address=${I}`}j(e.owner_name,t,w=>{X(w,e.owner_name)});const p=document.getElementById("vitalWeight");p&&(p.textContent=e.weight||"-");const g=document.getElementById("vitalTemp");g&&(g.textContent=e.temperature||"-");const f=document.getElementById("vitalHeart");f&&(f.textContent=e.heart_rate||"-");const h=document.getElementById("patientStatusSelect");h&&(h.value=e.status,k(h,e.status))}function W(t){A(t,e=>{const n=document.getElementById("notesContainer");if(n){if(e.length===0){n.innerHTML='<div class="p-4 text-xs text-slate-400 bg-slate-50 rounded-xl border border-slate-100 text-center">Belum ada rekam keluhan/catatan klinis.</div>';return}n.innerHTML=e.map(a=>{let o=a.title||"Keluhan / Catatan Medis";const r=a.note_date||"Hari ini";let i="";const d=o.match(/\[(Mild|Moderate|Severe)\]/i);if(d){const m=d[1];o=o.replace(/\[(Mild|Moderate|Severe)\]/i,"").trim(),m.toLowerCase()==="mild"?i='<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">Mild</span>':m.toLowerCase()==="moderate"?i='<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">Moderate</span>':i='<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">Severe</span>'}let s=[];o.startsWith("Gejala: ")&&(s=o.replace("Gejala: ","").trim().split(",").map(p=>p.trim()).filter(Boolean));const c=a.detail||"",u=c.match(/Daftar Gejala:\s*([^\n]+)/);u&&s.length===0&&(s=u[1].split(",").map(m=>m.trim()).filter(Boolean));let x="";return s.length>0&&(x=`
          <div class="flex flex-wrap items-center gap-1.5 pt-1 pl-4">
            <span class="text-[11px] font-bold text-slate-500">Gejala Pasien:</span>
            ${s.map(m=>`<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-200">${m}</span>`).join("")}
          </div>
        `),`
        <div class="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 transition-all hover:bg-white hover:shadow-xs">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="w-2 h-2 rounded-full bg-vetgreen-800 shrink-0"></span>
              <h3 class="text-xs font-bold text-slate-900">
                ${o}
              </h3>
              ${i}
            </div>
            <span class="text-[11px] text-slate-400 font-mono shrink-0">${r}</span>
          </div>
          ${x}
          <div class="text-xs text-slate-600 leading-relaxed whitespace-pre-line pl-4 border-l-2 border-slate-200 my-1">${c}</div>
        </div>
      `}).join("")}}),O(t,e=>{const n=document.getElementById("medsContainer");if(n){if(e.length===0){n.innerHTML='<div class="text-xs text-slate-400 p-2">Tidak ada obat aktif saat ini.</div>';return}n.innerHTML=e.map(a=>`
      <div class="med-item p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
        <div class="font-bold text-slate-800">${a.name}</div>
        <div class="text-[11px] text-slate-500 mt-0.5">${a.dose}</div>
      </div>
    `).join(""),window.lucide&&window.lucide.createIcons()}}),F(e=>{const n=e.filter(a=>a.patient_id===t);B=n,te(n)}),U(t,e=>{Y(e)})}function X(t,e){const n=document.getElementById("ownerPetsCountBadge"),a=1+t.length;n&&(n.textContent=`${a} Hewan Terdaftar`);const o=document.getElementById("topOwnerPetsSwitcher");if(o&&l){const i=s=>{const c=(s||"").toLowerCase();return c.includes("kucing")||c.includes("cat")?"🐱":c.includes("anjing")||c.includes("dog")?"🐶":c.includes("kelinci")||c.includes("rabbit")?"🐰":c.includes("burung")||c.includes("bird")?"🦜":"🐾"};let d=`
      <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-slate-900 rounded-xl font-bold text-xs shadow-xs border border-emerald-400 shrink-0">
        <span>${i(l.species)}</span>
        <span>${l.name}</span>
        <span class="text-[10px] bg-slate-900/20 px-1.5 py-0.2 rounded font-semibold text-white">Sedang Dilihat</span>
      </span>
    `;t.forEach(s=>{d+=`
        <a href="patient.html?id=${s.id}" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl font-semibold text-xs border border-slate-700 transition-all shrink-0">
          <span>${i(s.species)}</span>
          <span>${s.name}</span>
          <span class="text-[10px] text-slate-400 font-normal">(${s.species})</span>
        </a>
      `}),o.innerHTML=d}const r=document.getElementById("ownerOtherPetsList");if(r){if(t.length===0){r.innerHTML=`
      <div class="flex items-center justify-between w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 text-xs">
        <span>Belum ada hewan peliharaan lain terdaftar untuk <strong>${e}</strong>.</span>
      </div>
    `;return}r.innerHTML=t.map(i=>{let d="🐾";const s=(i.species||"").toLowerCase();return s.includes("kucing")||s.includes("cat")?d="🐱":s.includes("anjing")||s.includes("dog")?d="🐶":s.includes("kelinci")||s.includes("rabbit")?d="🐰":(s.includes("burung")||s.includes("bird"))&&(d="🦜"),`
      <a href="patient.html?id=${i.id}" class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-vetgreen-50 hover:border-vetgreen-300 text-slate-800 rounded-xl border border-slate-200 transition-all text-xs font-semibold group">
        <span>${d}</span>
        <span>${i.name}</span>
        <span class="text-[10px] text-slate-500 font-normal">(${i.species})</span>
        <i data-lucide="chevron-right" class="w-3 h-3 text-slate-400 group-hover:text-vetgreen-800"></i>
      </a>
    `}).join(""),window.lucide&&window.lucide.createIcons()}}function z(){const t=document.getElementById("revisitModal"),e=document.getElementById("revisitDateInput"),n=document.getElementById("revisitDoctorSelect"),a=document.getElementById("revisitStatusSelect"),o=document.getElementById("revisitWeightInput"),r=document.getElementById("revisitTempInput"),i=document.getElementById("revisitHrInput");e&&(e.value=new Date().toISOString().split("T")[0]),n&&l&&(n.value=l.doctor_name||"Dr. Sarah Jenkins"),a&&l&&(a.value=l.status||"Sehat"),o&&l&&(o.value=(l.weight||"").replace(" kg","")),r&&l&&(r.value=(l.temperature||"").replace(" °C","")),i&&l&&(i.value=(l.heart_rate||"").replace(" bpm","")),t==null||t.classList.remove("hidden")}function M(){const t=document.getElementById("revisitModal");t==null||t.classList.add("hidden")}async function Q(){var g;if(!b||!l)return;const t=document.getElementById("revisitDateInput"),e=document.getElementById("revisitDoctorSelect"),n=document.getElementById("revisitTitleInput"),a=document.getElementById("revisitDetailInput"),o=document.getElementById("revisitStatusSelect"),r=document.getElementById("revisitWeightInput"),i=document.getElementById("revisitTempInput"),d=document.getElementById("revisitHrInput"),s=document.getElementById("saveRevisitBtn"),c=(t==null?void 0:t.value)||new Date().toISOString().split("T")[0],u=(e==null?void 0:e.value)||"Dr. Sarah Jenkins",x=(n==null?void 0:n.value.trim())||"Kunjungan Ulang Kontrol",m=(a==null?void 0:a.value.trim())||"",p=(o==null?void 0:o.value)||l.status||"Sehat";if(!m){alert("Mohon isi judul dan detail keluhan kunjungan.");return}s&&(s.disabled=!0,s.innerHTML="⏳ Menyimpan...");try{const f=r==null?void 0:r.value.trim(),h=i==null?void 0:i.value.trim(),w=d==null?void 0:d.value.trim();await G(b,{visit_date:c,doctor_name:u,status:p,title:x,detail:m,weight:f?`${f} kg`:l.weight,temperature:h?`${h} °C`:l.temperature,heart_rate:w?`${w} bpm`:l.heart_rate}),await $(b),v("Catatan kunjungan ulang berhasil disimpan!"),M(),(g=document.getElementById("revisitForm"))==null||g.reset()}catch(f){console.error("Failed to record revisit:",f),alert("Gagal menyimpan rekam kunjungan ulang.")}finally{s&&(s.disabled=!1,s.innerHTML='<i data-lucide="check" class="w-4 h-4"></i> Simpan Kunjungan Ulang',window.lucide&&window.lucide.createIcons())}}function Y(t){const e=document.getElementById("vaccinationsTableBody");if(e){if(t.length===0){e.innerHTML=`
      <tr>
        <td colspan="5" class="p-6 text-center text-slate-400">
          <p class="font-bold text-slate-700 text-xs mb-1">Belum Ada Riwayat Vaksinasi</p>
          <p class="text-[11px]">Klik "Catat Vaksin" untuk menambahkan data vaksinasi atau obat cacing.</p>
        </td>
      </tr>
    `;return}e.innerHTML=t.map(n=>{let a="bg-emerald-100 text-emerald-800 border-emerald-200";return n.status==="Sebentar Lagi"?a="bg-amber-100 text-amber-800 border-amber-200":n.status==="Perlu Booster"&&(a="bg-rose-100 text-rose-800 border-rose-200"),`
      <tr class="hover:bg-slate-50/80 transition-colors">
        <td class="p-3">
          <span class="font-bold text-slate-900 block">${n.vaccine_name}</span>
          <span class="text-[10px] text-slate-500">${n.vaccine_type||"Vaksin Rutin"} ${n.notes?"&middot; "+n.notes:""}</span>
        </td>
        <td class="p-3 text-slate-700 whitespace-nowrap">${n.given_date||"-"}</td>
        <td class="p-3 font-semibold text-emerald-700 whitespace-nowrap">${n.due_date||"-"}</td>
        <td class="p-3 whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${a}">
            ${n.status||"Up to Date"}
          </span>
        </td>
        <td class="p-3 text-right whitespace-nowrap">
          <button onclick="deletePatientVaccine('${n.id}')" class="text-slate-400 hover:text-rose-600 transition-colors" title="Hapus Data Vaksin">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </td>
      </tr>
    `}).join(""),window.lucide&&window.lucide.createIcons()}}function Z(){const t=document.getElementById("addVaccineModal"),e=document.getElementById("vacGivenDateInput");e&&(e.value=new Date().toISOString().split("T")[0]),t==null||t.classList.remove("hidden")}function C(){const t=document.getElementById("addVaccineModal");t==null||t.classList.add("hidden")}async function ee(){var s;if(!b)return;const t=document.getElementById("vacTypeSelect"),e=document.getElementById("vacGivenDateInput"),n=document.getElementById("vacIntervalSelect"),a=document.getElementById("vacNotesInput"),o=document.getElementById("saveVaccineBtn"),r=t==null?void 0:t.value,i=e==null?void 0:e.value,d=parseInt((n==null?void 0:n.value)||"12",10);if(!r||!i){alert("Mohon lengkapi jenis vaksin dan tanggal.");return}o&&(o.disabled=!0,o.innerHTML="⏳ Menyimpan...");try{const c=new Date(i),u=new Date(c);u.setMonth(u.getMonth()+d);const x=u.toISOString().split("T")[0],m=new Date;let p="Up to Date";u<m?p="Perlu Booster":Math.ceil((u.getTime()-m.getTime())/864e5)<=30&&(p="Sebentar Lagi");let g="Vaksin Core";r.toLowerCase().includes("rabies")?g="Vaksin Rabies":r.toLowerCase().includes("cacing")||r.toLowerCase().includes("deworming")?g="Deworming":(r.toLowerCase().includes("kutu")||r.toLowerCase().includes("parasit")||r.toLowerCase().includes("spot-on"))&&(g="Anti-Parasit"),await J({patient_id:b,vaccine_name:r,vaccine_type:g,given_date:i,due_date:x,status:p,notes:(a==null?void 0:a.value.trim())||""}),v("Data vaksinasi berhasil ditambahkan!"),C(),(s=document.getElementById("addVaccineForm"))==null||s.reset()}catch(c){console.error("Failed to save vaccination:",c),alert("Gagal menyimpan data vaksin.")}finally{o&&(o.disabled=!1,o.innerHTML='<i data-lucide="check" class="w-4 h-4"></i> Simpan Record Vaksin',window.lucide&&window.lucide.createIcons())}}function te(t){const e=document.getElementById("patientPrescriptionsList");if(e){if(t.length===0){e.innerHTML=`
      <div class="p-8 text-center text-slate-400 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
        <i data-lucide="pill" class="w-8 h-8 mx-auto text-slate-300"></i>
        <p class="font-bold text-slate-700 text-xs">Belum Ada E-Resep Obat</p>
        <p class="text-[11px]">Klik tombol "Buat Resep Obat" di atas untuk meracik resep digital.</p>
      </div>
    `,window.lucide&&window.lucide.createIcons();return}e.innerHTML=t.map(n=>{const a=(n.items||[]).map(r=>`
      <div class="flex items-start justify-between py-1 text-xs border-b border-slate-100 last:border-0">
        <div>
          <span class="font-bold text-slate-800 block">${r.med_name}</span>
          <span class="text-[11px] text-slate-500">${r.instructions||""}</span>
        </div>
        <span class="font-semibold text-slate-700 text-right shrink-0 ml-2 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 text-[11px]">${r.dosage}</span>
      </div>
    `).join(""),o=n.status==="Active"?"bg-emerald-100 text-emerald-800 border-emerald-200":n.status==="Selesai"?"bg-slate-100 text-slate-700 border-slate-200":"bg-rose-100 text-rose-800 border-rose-200";return`
      <div class="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
        <div class="flex items-start justify-between gap-2 border-b border-slate-100 pb-2">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-bold text-xs text-slate-900">${n.prescription_number||"RX-000"}</span>
              <span class="text-[11px] text-slate-400">&middot; ${n.date||""}</span>
            </div>
            <span class="text-xs text-slate-500 block mt-0.5">Dokter: ${n.doctor_name||"Dr. Sarah Jenkins"} &middot; Durasi: ${n.duration||"7 Hari"}</span>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${o}">
            ${n.status||"Active"}
          </span>
        </div>

        <div class="space-y-1">
          <span class="text-[10px] font-bold uppercase text-slate-400 block">Item Resep Obat:</span>
          <div class="bg-slate-50 border border-slate-100 rounded-lg p-2.5">
            ${a||'<span class="text-xs text-slate-400">Tidak ada rincian item.</span>'}
          </div>
        </div>

        ${n.notes?`<p class="text-[11px] text-slate-500 italic bg-amber-50/50 p-2 rounded-lg border border-amber-100">📌 ${n.notes}</p>`:""}

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-[11px] text-slate-400">VetCore Clinical Portal</span>
          <div class="flex items-center gap-2">
            <button onclick="openPatientRxPreview('${n.id}')" class="px-3 py-1.5 rounded-lg border border-slate-200 font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 text-[11px] transition-colors">
              <i data-lucide="eye" class="w-3.5 h-3.5 text-slate-500"></i> Lihat / Cetak Resep
            </button>
            <button onclick="deletePatientRx('${n.id}')" class="px-2 py-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 text-[11px]" title="Hapus Resep">
              <i data-lucide="trash-2" class="w-4 h-4"></i> Hapus
            </button>
          </div>
        </div>
      </div>
    `}).join(""),window.lucide&&window.lucide.createIcons()}}function ne(){const t=document.getElementById("newPatientRxModal"),e=document.getElementById("patientRxNumberInput"),n=document.getElementById("rxModalPatientName");n&&l&&(n.textContent=l.name),e&&(e.value=`RX-2025-${String(B.length+1).padStart(3,"0")}`);const a=document.getElementById("patientRxItemsContainer");a&&(a.innerHTML="",E("Amoxicillin 250mg","2x1 hari","Sesudah makan"),E("Vitamin & Suplemen","1x1 hari","Campur ke makanan")),t==null||t.classList.remove("hidden")}function R(){const t=document.getElementById("newPatientRxModal");t==null||t.classList.add("hidden")}function E(t="",e="",n=""){const a=document.getElementById("patientRxItemsContainer");if(!a)return;const o=`prx_item_${Date.now()}_${Math.random().toString(36).substring(2,6)}`,r=document.createElement("div");r.id=o,r.className="grid grid-cols-12 gap-2 items-center bg-slate-50 border border-slate-200 p-2.5 rounded-xl text-xs",r.innerHTML=`
    <div class="col-span-5">
      <input type="text" placeholder="Nama Obat *" required value="${t}" 
             class="prx-med-name w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vetgreen-800">
    </div>
    <div class="col-span-3">
      <input type="text" placeholder="Dosis" required value="${e}" 
             class="prx-med-dosage w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vetgreen-800">
    </div>
    <div class="col-span-3">
      <input type="text" placeholder="Instruksi" value="${n}" 
             class="prx-med-instructions w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-vetgreen-800">
    </div>
    <div class="col-span-1 text-right">
      <button type="button" onclick="removePatientRxRow('${o}')" class="text-slate-400 hover:text-rose-600">✕</button>
    </div>
  `,a.appendChild(r)}window.removePatientRxRow=t=>{var e;(e=document.getElementById(t))==null||e.remove()};async function ae(){var d;if(!l||!b)return;const t=document.getElementById("patientRxDoctorSelect"),e=document.getElementById("patientRxNumberInput"),n=document.getElementById("patientRxDurationSelect"),a=document.getElementById("patientRxNotesInput"),o=document.getElementById("savePatientRxBtn"),r=document.querySelectorAll("#patientRxItemsContainer > div"),i=[];if(r.forEach(s=>{var m,p,g;const c=(m=s.querySelector(".prx-med-name"))==null?void 0:m.value.trim(),u=(p=s.querySelector(".prx-med-dosage"))==null?void 0:p.value.trim(),x=((g=s.querySelector(".prx-med-instructions"))==null?void 0:g.value.trim())||"";c&&u&&i.push({med_name:c,dosage:u,instructions:x})}),i.length===0){alert("Mohon masukkan minimal 1 obat.");return}o&&(o.disabled=!0,o.innerHTML="⏳ Menyimpan...");try{const s={patient_id:b,patient_name:l.name,patient_code:l.code||"#VET-000",species:`${l.species} (${l.breed||""})`,owner_name:l.owner_name,doctor_name:(t==null?void 0:t.value)||"Dr. Sarah Jenkins",prescription_number:(e==null?void 0:e.value.trim())||`RX-${Date.now()}`,date:new Date().toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"}),duration:(n==null?void 0:n.value)||"7 Hari",status:"Active",notes:(a==null?void 0:a.value.trim())||"",items:i};await q(s),v("E-Resep berhasil dibuat!"),R(),(d=document.getElementById("createPatientRxForm"))==null||d.reset()}catch(s){console.error("Failed to create prescription:",s),alert("Gagal membuat resep.")}finally{o&&(o.disabled=!1,o.innerHTML='<i data-lucide="check" class="w-4 h-4"></i> Simpan & Terbitkan Resep',window.lucide&&window.lucide.createIcons())}}window.openPatientRxPreview=t=>{const e=B.find(m=>m.id===t);if(!e)return;const n=document.getElementById("viewRxModal"),a=document.getElementById("previewRxNumber"),o=document.getElementById("previewRxDate"),r=document.getElementById("previewPatientName"),i=document.getElementById("previewPatientCode"),d=document.getElementById("previewOwnerName"),s=document.getElementById("previewDoctorName"),c=document.getElementById("previewRxItemsBody"),u=document.getElementById("previewRxNotes"),x=document.getElementById("previewDoctorSign");a&&(a.textContent=e.prescription_number||"RX-001"),o&&(o.textContent=e.date||""),r&&(r.textContent=`${e.patient_name||"Pasien"} (${e.species||""})`),i&&(i.textContent=`ID: ${e.patient_code||"-"}`),d&&(d.textContent=e.owner_name||"-"),s&&(s.textContent=`Dokter: ${e.doctor_name||"Dr. Sarah Jenkins"}`),x&&(x.textContent=e.doctor_name||"Dr. Sarah Jenkins"),u&&(u.textContent=`Durasi Pengobatan: ${e.duration||"7 Hari"}. ${e.notes?"Catatan: "+e.notes:""}`),c&&(c.innerHTML=(e.items||[]).map((m,p)=>`
      <tr>
        <td class="p-2 font-bold text-slate-500">${p+1}</td>
        <td class="p-2 font-bold text-slate-900">${m.med_name}</td>
        <td class="p-2 font-semibold text-slate-700 bg-slate-50">${m.dosage}</td>
        <td class="p-2 text-slate-600">${m.instructions||"-"}</td>
      </tr>
    `).join("")),n==null||n.classList.remove("hidden")};window.deletePatientRx=async t=>{try{await D(t),v("E-Resep berhasil dihapus.")}catch(e){console.error("Failed to delete rx:",e),v("Gagal menghapus resep.")}};function se(t){const e=document.getElementById("medForm");e&&(typeof t=="boolean"?t?e.classList.remove("hidden"):e.classList.add("hidden"):e.classList.toggle("hidden"))}function v(t){const e=document.getElementById("toastNotification"),n=document.getElementById("toastText");e&&n&&(n.textContent=t,e.classList.remove("translate-y-20","opacity-0","pointer-events-none"),setTimeout(()=>{e.classList.add("translate-y-20","opacity-0","pointer-events-none")},3e3))}window.switchPatientTab=K;window.openRevisitModal=z;window.closeRevisitModal=M;window.openPatientRxModal=ne;window.closePatientRxModal=R;window.addPatientRxItemRow=E;window.openAddVaccineModal=Z;window.closeAddVaccineModal=C;window.deletePatientVaccine=async t=>{if(confirm("Hapus data rekam vaksinasi ini?"))try{await _(t),v("Data vaksinasi berhasil dihapus.")}catch(e){console.error("Failed to delete vaccine:",e),v("Gagal menghapus data vaksin.")}};window.toggleMedForm=se;window.openVitalsModal=()=>{const t=document.getElementById("vitalsModal");t&&t.classList.remove("hidden")};window.closeVitalsModal=()=>{const t=document.getElementById("vitalsModal");t&&t.classList.add("hidden")};
