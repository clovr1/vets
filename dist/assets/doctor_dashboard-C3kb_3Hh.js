import{g as $,i as C}from"./auth-BsRFV8R9.js";import{a as N,b as T,d as m,e as p,f as E,h as D,i as H,q as M,l as L,o as S,j as q}from"./firebase-DV4sE05K.js";document.addEventListener("DOMContentLoaded",async()=>{const o=$();C();const u=document.getElementById("doctorPortalName"),x=document.getElementById("doctorPortalSip"),f=document.getElementById("doctorPortalSpec");u&&(u.textContent=o.name),x&&(x.textContent=o.nip_sip),f&&(f.textContent=o.specialization||"Dokter Hewan Praktik");const n=document.getElementById("doctorPatientSelect");N(i=>{n&&(n.innerHTML='<option value="">-- Pilih Pasien Hewan --</option>',i.forEach(t=>{const e=document.createElement("option");e.value=t.id,e.textContent=`${t.code||"#VET"} - ${t.name} (${t.species}) | Pemilik: ${t.owner_name}`,e.dataset.patientName=t.name,e.dataset.patientCode=t.code||"",e.dataset.ownerName=t.owner_name,e.dataset.species=t.species,n.appendChild(e)}));const s=document.getElementById("doctorQueueTbody");if(s){const t=i.filter(e=>e.status!=="Sehat").slice(0,5);t.length===0?s.innerHTML='<tr><td colspan="6" class="px-5 py-6 text-center text-xs text-slate-400">Semua pasien hewan dalam kondisi sehat / tidak ada antrean darurat.</td></tr>':s.innerHTML=t.map(e=>`
          <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-5 py-3.5 font-mono text-xs text-slate-500">${e.code||"#PT-0000"}</td>
            <td class="px-5 py-3.5 font-bold text-sm text-slate-900">${e.name} <span class="text-xs text-slate-500 font-normal">(${e.species})</span></td>
            <td class="px-5 py-3.5 text-xs text-slate-700">${e.owner_name}</td>
            <td class="px-5 py-3.5 text-xs">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-amber-100 text-amber-800 border border-amber-200">
                ${e.status}
              </span>
            </td>
            <td class="px-5 py-3.5 text-xs text-slate-600">${e.last_visit||"Hari ini"}</td>
            <td class="px-5 py-3.5 text-right">
              <a href="patient.html?id=${e.id}" class="inline-flex items-center gap-1 text-xs font-bold text-vetgreen-800 hover:underline">
                Periksa <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </a>
            </td>
          </tr>
        `).join("")}});const c=document.getElementById("doctorQuickNoteForm"),d=document.getElementById("doctorActionAlert");c&&c.addEventListener("submit",async i=>{var g,h,v,b;i.preventDefault();const s=n==null?void 0:n.value,t=(g=document.getElementById("doctorNoteTitle"))==null?void 0:g.value,e=(h=document.getElementById("doctorNoteDetail"))==null?void 0:h.value,y=(v=document.getElementById("doctorMedName"))==null?void 0:v.value,_=(b=document.getElementById("doctorMedDosage"))==null?void 0:b.value;if(!s){alert("Harap pilih pasien hewan terlebih dahulu.");return}try{const r="10 Aug, 2026";if(await T(m(p,"clinical_notes"),{patient_id:s,title:t||"Catatan Diagnosis Dokter",detail:e,note_date:r,doctor_name:o.name,created_at:E()}),y){const a=n==null?void 0:n.options[n.selectedIndex],w=(a==null?void 0:a.dataset.patientName)||"Pasien",I=(a==null?void 0:a.dataset.patientCode)||"#PT-0000",k=(a==null?void 0:a.dataset.species)||"Hewan",P=(a==null?void 0:a.dataset.ownerName)||"Pemilik",B=D(m(p,"prescriptions"));await H(B,{patient_id:s,patient_name:w,patient_code:I,species:k,owner_name:P,doctor_name:o.name,prescription_number:"RX-"+Math.floor(1e3+Math.random()*9e3),date:r,duration:"5 Hari",status:"Active",notes:e||"Diberikan langsung oleh dokter.",items:[{med_name:y,dosage:_||"1x sehari",instructions:"Sesuai instruksi dokter"}],created_at:E()})}d&&(d.textContent="✓ Catatan Medis & E-Prescription Berhasil Disimpan!",d.classList.remove("hidden"),setTimeout(()=>d.classList.add("hidden"),4e3)),c.reset()}catch(r){console.error("Error saving doctor notes:",r),alert("Gagal menyimpan rekam medis.")}});const l=document.getElementById("doctorRecentNotesFeed");if(l){const i=M(m(p,"clinical_notes"),S("created_at","desc"),L(6));q(i,s=>{if(s.empty){l.innerHTML='<div class="text-xs text-slate-400">Belum ada catatan medis terbaru.</div>';return}l.innerHTML=s.docs.map(t=>{const e=t.data();return`
          <div class="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-slate-900">${e.title||"Pemeriksaan Klinis"}</span>
              <span class="text-[10px] text-slate-400 font-mono">${e.note_date||"Hari ini"}</span>
            </div>
            <p class="text-xs text-slate-600 line-clamp-2">${e.detail||"-"}</p>
            <div class="text-[10px] text-emerald-800 font-medium pt-1">Dokter: ${e.doctor_name||o.name}</div>
          </div>
        `}).join("")})}window.lucide&&window.lucide.createIcons()});
