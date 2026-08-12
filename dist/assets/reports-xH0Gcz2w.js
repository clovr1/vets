import{i as D}from"./auth-BsRFV8R9.js";import{s as H,a as N,E as A,F as _,G as F}from"./firebase-DV4sE05K.js";let h=[],B=[],b="ALL",c=1;const I=10;document.addEventListener("DOMContentLoaded",async()=>{D(),await H(),N(n=>{h=n.sort((d,u)=>(d.code||"").localeCompare(u.code||"")),O(h),v(),P()}),A(n=>{B=n,y(),P()});const e=document.getElementById("patientListSearch");e&&e.addEventListener("input",()=>{c=1,v()});const t=document.getElementById("patientMrnSelect");t&&t.addEventListener("change",()=>{b=t.value,y()});const a=document.getElementById("recordSearchInput");a&&a.addEventListener("input",()=>{y()});const l=document.getElementById("newRecordForm");l&&l.addEventListener("submit",async n=>{n.preventDefault(),await G()});const s=new URLSearchParams(window.location.search),i=s.get("patient")||s.get("mrn");i&&R(i)});function U(e){const t=(e||"").toLowerCase();return t.includes("canine")||t.includes("anjing")||t.includes("dog")?{pillClass:"bg-blue-100 text-blue-700 font-semibold",iconBg:"bg-teal-50 text-teal-800 border border-teal-200/80",label:"Canine"}:t.includes("feline")||t.includes("kucing")||t.includes("cat")?{pillClass:"bg-purple-100 text-purple-700 font-semibold",iconBg:"bg-purple-50 text-purple-800 border border-purple-200/80",label:"Feline"}:t.includes("rabbit")||t.includes("kelinci")?{pillClass:"bg-amber-100 text-amber-700 font-semibold",iconBg:"bg-amber-50 text-amber-800 border border-amber-200/80",label:"Rabbit"}:{pillClass:"bg-emerald-100 text-emerald-700 font-semibold",iconBg:"bg-emerald-50 text-emerald-800 border border-emerald-200/80",label:e||"Exotic"}}function v(){const e=document.getElementById("patientListTableBody");if(!e)return;const t=document.getElementById("patientListSearch"),a=((t==null?void 0:t.value)||"").toLowerCase(),l=h.filter(o=>a?o.name.toLowerCase().includes(a)||(o.code||"").toLowerCase().includes(a)||(o.species||"").toLowerCase().includes(a)||(o.breed||"").toLowerCase().includes(a)||(o.owner_name||"").toLowerCase().includes(a):!0),s=l.length,i=Math.ceil(s/I)||1;c>i&&(c=i),c<1&&(c=1);const n=(c-1)*I,d=Math.min(n+I,s),u=l.slice(n,d),r=document.getElementById("patientListShowingText");r&&(s===0?r.textContent="Showing 0 to 0 of 0 entries":r.textContent=`Showing ${(n+1).toLocaleString()} to ${d.toLocaleString()} of ${s.toLocaleString()} entries`);const p=document.getElementById("patientListPaginationControls");if(p)if(s===0)p.innerHTML="";else{let o="";o+=`
        <button 
          ${c===1?"disabled":""} 
          onclick="changeReportPage(${c-1})"
          class="bg-white border border-slate-200 text-slate-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors">
          Prev
        </button>
      `;const g=5;let m=Math.max(1,c-Math.floor(g/2)),f=Math.min(i,m+g-1);f-m+1<g&&(m=Math.max(1,f-g+1)),m>1&&(o+='<button onclick="changeReportPage(1)" class="bg-white border border-slate-200 text-slate-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50">1</button>',m>2&&(o+='<span class="px-1 text-slate-400 text-xs font-bold">...</span>'));for(let x=m;x<=f;x++)x===c?o+=`<button class="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-2xs">${x}</button>`:o+=`<button onclick="changeReportPage(${x})" class="bg-white border border-slate-200 text-slate-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 transition-colors">${x}</button>`;f<i&&(f<i-1&&(o+='<span class="px-1 text-slate-400 text-xs font-bold">...</span>'),o+=`<button onclick="changeReportPage(${i})" class="bg-white border border-slate-200 text-slate-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50">${i}</button>`),o+=`
        <button 
          ${c===i?"disabled":""} 
          onclick="changeReportPage(${c+1})"
          class="bg-white border border-slate-200 text-slate-600 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors">
          Next
        </button>
      `,p.innerHTML=o}if(s===0){e.innerHTML=`
      <tr>
        <td colspan="5" class="py-12 text-center text-slate-400">
          <i data-lucide="folder-open" class="w-8 h-8 mx-auto text-slate-300 mb-2"></i>
          <p class="text-xs font-semibold text-slate-600">Tidak ada pasien ditemukan</p>
          <p class="text-[11px] text-slate-400 mt-1">Coba kata kunci pencarian yang berbeda.</p>
        </td>
      </tr>
    `,window.lucide&&window.lucide.createIcons();return}const L=u.map(o=>{const g=U(o.species),m=o.code||`#PT-${o.id||"1000"}`;return`
      <tr class="hover:bg-slate-50/80 transition-colors">
        <!-- PATIENT -->
        <td class="px-6 py-4">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl ${g.iconBg} flex items-center justify-center shrink-0">
              <i data-lucide="paw-print" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="font-bold text-xs text-slate-900">${o.name}</div>
              <div class="text-[11px] font-mono text-slate-400 mt-0.5">${m}</div>
            </div>
          </div>
        </td>

        <!-- SPECIES / BREED -->
        <td class="px-6 py-4">
          <span class="inline-block px-2.5 py-0.5 rounded-full text-[10px] ${g.pillClass}">
            ${g.label}
          </span>
          <div class="text-xs text-slate-500 mt-1">${o.breed||"-"}</div>
        </td>

        <!-- OWNER -->
        <td class="px-6 py-4 text-xs font-semibold text-slate-700">
          ${o.owner_name}
        </td>

        <!-- LAST VISIT -->
        <td class="px-6 py-4 text-xs text-slate-600 font-medium">
          ${o.last_visit||"Hari ini"}
        </td>

        <!-- ACTION -->
        <td class="px-6 py-4 text-right">
          <button onclick="viewPatientMedicalRecord('${m}')" class="text-xs font-bold text-slate-800 hover:text-vetgreen-800 transition-colors inline-flex items-center justify-end gap-1 ml-auto group">
            <span>View Record</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform"></i>
          </button>
        </td>
      </tr>
    `}).join("");e.innerHTML=L,window.lucide&&window.lucide.createIcons()}function R(e){b=e;const t=document.getElementById("patientListView"),a=document.getElementById("detailRecordView");t==null||t.classList.add("hidden"),a==null||a.classList.remove("hidden");const l=document.getElementById("patientMrnSelect");l&&(l.value=e);const s=h.find(d=>(d.code||`#PT-${d.id}`)===e||d.id===e),i=document.getElementById("selectedPatientTitle"),n=document.getElementById("selectedPatientSubtitle");s?(i&&(i.textContent=`Rekam Medis: ${s.name} (${e})`),n&&(n.textContent=`${s.species} - ${s.breed} | Pemilik: ${s.owner_name}`)):(i&&(i.textContent=`Rekam Medis: ${e}`),n&&(n.textContent="Catatan riwayat pemeriksaan klinis, diagnosa, dan pengobatan pasien.")),y()}function V(){b="ALL";const e=document.getElementById("patientListView"),t=document.getElementById("detailRecordView");t==null||t.classList.add("hidden"),e==null||e.classList.remove("hidden"),v()}function P(){const e=document.getElementById("statTotalRecords"),t=document.getElementById("statPendingReview"),a=document.getElementById("statRecentLabs");e&&(e.textContent=B.length.toLocaleString()),t&&(t.textContent="0"),a&&(a.textContent="0")}function O(e){const t=document.getElementById("patientMrnSelect"),a=document.getElementById("modalPatientSelect");if(t){const l=t.value;t.innerHTML=`
      <option value="ALL">Semua Pasien / MRN</option>
      ${e.map(s=>{const i=s.code||`#PT-${s.id}`;return`<option value="${i}">MRN: ${i} (${s.name})</option>`}).join("")}
    `,t.value=l||b||"ALL"}a&&(e.length===0?a.innerHTML=`
        <option value="" disabled selected>-- Pilih Pasien --</option>
        <option value="VET-2026-001" data-name="Umum / Pasien Baru">Pasien Umum / Baru (MRN: VET-2026-001)</option>
      `:a.innerHTML=`
        <option value="" disabled selected>-- Pilih Pasien --</option>
        ${e.map(l=>{const s=l.code||`#PT-${l.id}`;return`
            <option value="${s}" data-name="${l.name}" data-id="${l.id||""}">
              ${l.name} (${s}) - ${l.species}
            </option>
          `}).join("")}
      `)}function y(){const e=document.getElementById("recordsTableBody");if(!e)return;const t=document.getElementById("recordSearchInput"),a=((t==null?void 0:t.value)||"").toLowerCase();let l=B.filter(n=>{const d=b==="ALL"||n.mrn===b||(n.mrn||"").includes(b),u=!a||n.subjective.toLowerCase().includes(a)||n.objective.toLowerCase().includes(a)||n.diagnosis.some(r=>r.toLowerCase().includes(a))||n.treatments.some(r=>r.toLowerCase().includes(a))||n.doctor_name.toLowerCase().includes(a)||n.notes.toLowerCase().includes(a);return d&&u});const s=document.getElementById("currentMrnDisplay");if(s&&(b!=="ALL"?s.textContent=`MRN: ${b}`:s.textContent="SEMUA PASIEN"),l.length===0){e.innerHTML=`
      <tr>
        <td colspan="5" class="py-12 text-center text-slate-400 bg-slate-50/50">
          <div class="space-y-2">
            <i data-lucide="file-x" class="w-8 h-8 mx-auto text-slate-300"></i>
            <p class="text-xs font-semibold text-slate-600">Tidak ada rekam medis ditemukan</p>
            <p class="text-[11px] text-slate-400">Silakan klik "+ Rekam Medis" di atas untuk menambah rekam medis baru.</p>
          </div>
        </td>
      </tr>
    `,window.lucide&&window.lucide.createIcons();return}const i=l.map(n=>{const d=(n.diagnosis||[]).map(p=>`
      <span class="inline-block bg-slate-100 text-slate-700 border border-slate-200/80 px-2.5 py-1 rounded-md text-[11px] font-medium leading-tight">
        ${p}
      </span>
    `).join(" "),u=(n.treatments||[]).map(p=>`
      <li class="flex items-start gap-1.5 text-xs text-slate-700 leading-snug">
        <span class="text-slate-400 text-base leading-none select-none">•</span>
        <span>${p}</span>
      </li>
    `).join(""),r=n.doctor_initials||k(n.doctor_name);return`
      <tr class="hover:bg-slate-50/70 transition-colors group">
        <!-- Tanggal Berobat (Date) -->
        <td class="px-5 py-4 align-top border-r border-slate-200/70 w-32 shrink-0">
          <div class="font-bold text-xs text-slate-900 leading-tight">${n.date}</div>
          <div class="text-[11px] text-slate-400 font-mono mt-1">${n.time||""}</div>
        </td>

        <!-- Anamnesa (Findings) -->
        <td class="px-5 py-4 align-top border-r border-slate-200/70 space-y-2">
          ${n.subjective?`
            <div class="text-xs text-slate-800 leading-relaxed">
              <strong class="font-bold text-slate-900">S:</strong> ${n.subjective}
            </div>
          `:""}
          ${n.objective?`
            <div class="text-xs text-slate-800 leading-relaxed">
              <strong class="font-bold text-slate-900">O:</strong> ${n.objective}
            </div>
          `:""}
        </td>

        <!-- Diagnosa (Diagnosis) -->
        <td class="px-5 py-4 align-top border-r border-slate-200/70 w-44 shrink-0 space-y-1.5">
          ${d||'<span class="text-xs text-slate-400">-</span>'}
        </td>

        <!-- Pengobatan (Treatment) -->
        <td class="px-5 py-4 align-top border-r border-slate-200/70">
          <ul class="space-y-1.5">
            ${u||'<span class="text-xs text-slate-400">-</span>'}
          </ul>
        </td>

        <!-- Catatan (Notes) -->
        <td class="px-5 py-4 align-top space-y-2 relative">
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-[#044e3a] text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-2xs">
              ${r}
            </span>
            <span class="text-xs font-semibold text-slate-800 truncate">${n.doctor_name}</span>
          </div>
          <p class="text-xs text-slate-600 leading-relaxed">${n.notes||"-"}</p>

          <div class="pt-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 text-[11px]">
            <button onclick="deleteRecordItem('${n.id}')" class="text-slate-400 hover:text-rose-600 p-1 transition-colors" title="Hapus Rekam Medis">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    `}).join("");e.innerHTML=i,window.lucide&&window.lucide.createIcons()}function k(e){if(!e)return"DR";const t=e.replace(/^Dr\.\s*/i,"").trim().split(" ");return t.length===1?t[0].substring(0,2).toUpperCase():(t[0][0]+t[1][0]).toUpperCase()}function q(){const e=document.getElementById("newRecordModal");e==null||e.classList.remove("hidden")}function T(){const e=document.getElementById("newRecordModal");e==null||e.classList.add("hidden")}async function G(){var M;const e=document.getElementById("modalPatientSelect"),t=document.getElementById("recordDateInput"),a=document.getElementById("recordTimeInput"),l=document.getElementById("recordSubjInput"),s=document.getElementById("recordObjInput"),i=document.getElementById("recordDiagInput"),n=document.getElementById("recordTreatInput"),d=document.getElementById("recordDoctorSelect"),u=document.getElementById("recordNotesInput"),r=document.getElementById("saveRecordBtn");if(!e||!l||!i)return;const p=e.options[e.selectedIndex],L=e.value||"VET-2023-8842",o=(p==null?void 0:p.getAttribute("data-name"))||"Buddy",g=t==null?void 0:t.value;let m="Hari ini";g&&(m=new Date(g).toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}));let f=(a==null?void 0:a.value)||"09:00 AM";const x=i.value.trim(),S=x?x.split(",").map(w=>w.trim()).filter(Boolean):["Unspecified"],E=(n==null?void 0:n.value.trim())||"",C=E?E.split(`
`).map(w=>w.trim()).filter(Boolean):[],$=(d==null?void 0:d.value)||"Dr. Smith",j=k($);r&&(r.disabled=!0,r.innerHTML="⏳ Menyimpan...");try{await _({mrn:L,patient_name:o,date:m,time:f,subjective:l.value.trim(),objective:(s==null?void 0:s.value.trim())||"",diagnosis:S,treatments:C,doctor_name:$,doctor_initials:j,notes:(u==null?void 0:u.value.trim())||""}),T(),(M=document.getElementById("newRecordForm"))==null||M.reset()}catch(w){console.error("Failed to save medical record:",w),alert("Gagal menyimpan rekam medis.")}finally{r&&(r.disabled=!1,r.innerHTML='<i data-lucide="check" class="w-4 h-4"></i> Simpan Rekam Medis',window.lucide&&window.lucide.createIcons())}}window.openNewRecordModal=q;window.closeNewRecordModal=T;window.viewPatientMedicalRecord=R;window.backToPatientList=V;window.changeReportPage=e=>{c=e,v()};window.deleteRecordItem=async e=>{if(confirm("Apakah Anda yakin ingin menghapus rekam medis ini?"))try{await F(e)}catch(t){console.error("Failed to delete medical record:",t)}};
