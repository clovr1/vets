import{i as P}from"./auth-BsRFV8R9.js";import{s as S,a as M}from"./firebase-DV4sE05K.js";let E=[],m=[],w=null,c=1;const v=5,$=["bg-emerald-600 text-white","bg-indigo-600 text-white","bg-purple-600 text-white","bg-amber-600 text-white","bg-teal-600 text-white","bg-rose-600 text-white"];function O(s){return $[s%$.length]}function T(s){if(!s)return"PT";const n=s.trim().split(/\s+/);return n.length>=2?(n[0][0]+n[1][0]).toUpperCase():s.slice(0,2).toUpperCase()}document.addEventListener("DOMContentLoaded",async()=>{P(),await S();const s=document.getElementById("searchInput"),n=document.getElementById("speciesFilter"),o=document.getElementById("statusFilter"),a=document.getElementById("lastVisitFilter"),i=()=>{c=1,B()};s&&s.addEventListener("keyup",i),n&&n.addEventListener("change",i),o&&o.addEventListener("change",i),a&&a.addEventListener("change",i);const r=document.getElementById("ownerPrevBtn"),l=document.getElementById("ownerNextBtn");r&&r.addEventListener("click",()=>{c>1&&(c--,L())}),l&&l.addEventListener("click",()=>{const t=Math.ceil(m.length/v)||1;c<t&&(c++,L())}),M(t=>{E=t,B()})});function B(){const s=document.getElementById("searchInput"),n=document.getElementById("speciesFilter"),o=document.getElementById("statusFilter"),a=((s==null?void 0:s.value)||"").toLowerCase().trim(),i=((n==null?void 0:n.value)||"all").toLowerCase(),r=((o==null?void 0:o.value)||"all").toLowerCase(),l=new Map;E.forEach(e=>{const u=e.owner_name?e.owner_name.trim():"Tanpa Nama",f=u.toLowerCase();if(!l.has(f))l.set(f,{owner_name:u,code:e.code||"#VET-000",phone:e.phone&&e.phone!=="-"?e.phone:"+62 813 9876 5432",address:e.address||"-",pets:[e]});else{const x=l.get(f);x.pets.push(e),e.phone&&e.phone!=="-"&&(x.phone=e.phone),e.address&&e.address!=="-"&&(x.address=e.address)}}),m=Array.from(l.values()).filter(e=>{const u=!a||e.owner_name.toLowerCase().includes(a)||e.code.toLowerCase().includes(a)||e.phone.toLowerCase().includes(a)||e.pets.some(d=>{var p;return d.name.toLowerCase().includes(a)||((p=d.breed)==null?void 0:p.toLowerCase().includes(a))}),f=i==="all"||e.pets.some(d=>d.species.toLowerCase().includes(i)),x=r==="all"||e.pets.some(d=>d.status.toLowerCase().includes(r));return u&&f&&x}),m.length>0?(!m.some(u=>u.owner_name.toLowerCase()===w)||!w)&&(w=m[0].owner_name.toLowerCase()):w=null,L(),k()}function L(){const s=document.getElementById("ownerListContainer"),n=document.getElementById("ownerPaginationText"),o=document.getElementById("ownerPrevBtn"),a=document.getElementById("ownerNextBtn");if(!s)return;if(m.length===0){s.innerHTML=`
      <div class="text-center py-10 text-slate-400 text-xs font-medium">
        Tidak ada pemilik yang cocok.
      </div>
    `,n&&(n.textContent="0 of 0"),o&&(o.disabled=!0),a&&(a.disabled=!0);return}const i=Math.ceil(m.length/v)||1;c>i&&(c=i),c<1&&(c=1);const r=(c-1)*v,l=Math.min(r+v,m.length),t=m.slice(r,l);n&&(n.textContent=`${r+1}-${l} of ${m.length}`),o&&(o.disabled=c===1),a&&(a.disabled=c===i),s.innerHTML=t.map((e,u)=>{const x=e.owner_name.toLowerCase()===w,d=e.pets.length;let p=e.pets.map(g=>g.name).slice(0,3).join(", ");d>3&&(p+=` +${d-3}`);const C=`${d} ${d===1?"Pet":"Pets"} · ${p}`,h=e.pets.map((g,y)=>{const I=T(g.name);return`
        <span class="w-6 h-6 rounded-full ${O(y)} text-[10px] font-extrabold flex items-center justify-center shrink-0 border border-white shadow-2xs" title="${g.name} (${g.species})">
          ${I}
        </span>
      `}).join(""),b=x?"bg-slate-100 text-slate-900 border border-slate-300 font-semibold shadow-2xs":"bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80";return`
      <div onclick="selectOwner('${e.owner_name.replace(/'/g,"\\'")}')" class="p-3.5 rounded-xl cursor-pointer transition-all ${b}">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-bold text-xs text-slate-900 truncate">${e.owner_name}</h3>
          <span class="font-mono text-[10px] text-slate-400 font-semibold shrink-0">${e.code}</span>
        </div>
        <p class="text-[11px] text-slate-500 truncate mt-1">${C}</p>
        <div class="flex items-center gap-1 mt-2.5">
          ${h}
        </div>
      </div>
    `}).join("")}window.selectOwner=s=>{w=s.toLowerCase(),L(),k()};function k(){const s=document.getElementById("selectedOwnerName"),n=document.getElementById("selectedOwnerDetails"),o=document.getElementById("selectedPetsCount"),a=document.getElementById("petCardsGrid"),i=document.getElementById("addPetForOwnerBtn");if(!a)return;const r=m.find(t=>t.owner_name.toLowerCase()===w);if(!r){s&&(s.textContent="Pilih Pemilik"),n&&(n.textContent="Silakan pilih pemilik dari daftar di sebelah kiri."),o&&(o.textContent="0"),i&&i.classList.add("hidden"),a.innerHTML=`
      <div class="col-span-full text-center py-12 text-slate-400 text-xs font-medium">
        Belum ada pemilik yang dipilih.
      </div>
    `;return}s&&(s.textContent=r.owner_name),n&&(n.innerHTML=`<span class="font-mono text-slate-500">${r.code}</span> <span class="ml-2 text-slate-500 font-medium">📞 ${r.phone}</span>`),o&&(o.textContent=r.pets.length.toString()),i&&i.classList.add("hidden"),a.className="flex flex-col space-y-4";const l=["bg-rose-100 text-rose-800 border border-rose-200/80","bg-emerald-100 text-emerald-800 border border-emerald-200/80","bg-purple-100 text-purple-800 border border-purple-200/80","bg-amber-100 text-amber-800 border border-amber-200/80"];a.innerHTML=r.pets.map((t,e)=>{const u=T(t.name),f=l[e%l.length],x=t.breed?`${t.breed}`:t.species,d=t.age?`${t.age}`:"1",p=t.last_visit||"2026-08-12",C=p.includes("T")?p.split("T")[0]:p,h=t.status||"Menunggu Pemeriksaan";let b=`
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold">
        <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-500"></i> ${h}
      </span>
    `;t.notes&&t.notes.length>0&&!t.notes.toLowerCase().includes("sehat")?b=`
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold">
          <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-500"></i> ${t.notes.slice(0,30)}
        </span>
      `:h.toLowerCase().includes("sehat")&&(b=`
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i> Sehat (Tidak Ada Catatan)
        </span>
      `);const g=h.toLowerCase().includes("sehat")||h.toLowerCase().includes("selesai"),y=g?"Selesai":"Belum Selesai",I=g?"check-circle-2":"clock";return`
      <div class="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 transition-all shadow-2xs hover:border-slate-300">
        <!-- Top Row: Avatar, Pet Info (Name, Species·Breed·Age), and Top Right Status Text -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-full ${f} font-bold text-xs flex items-center justify-center shrink-0">
              ${u}
            </div>
            <div>
              <h4 class="font-bold text-sm text-slate-900 leading-tight">${t.name}</h4>
              <p class="text-xs text-slate-500 font-medium mt-0.5">
                ${t.species} · ${x} · ${d}
              </p>
            </div>
          </div>

          <!-- Top Right Plain Status Text (Matching Screenshot) -->
          <span class="text-xs text-slate-700 font-medium pt-0.5">
            ${h}
          </span>
        </div>

        <!-- Middle Row: LAST VISIT & MEDICAL HIGHLIGHTS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              LAST VISIT
            </span>
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>${C}</span>
            </div>
          </div>

          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              MEDICAL HIGHLIGHTS
            </span>
            <div>
              ${b}
            </div>
          </div>
        </div>

        <!-- Bottom Row: Full Width Status Button (Links to Patient Intake) -->
        <a href="patient.html?id=${t.id}" class="w-full bg-slate-50/80 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs group">
          <i data-lucide="${I}" class="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors"></i>
          <span>${y}</span>
        </a>
      </div>
    `}).join(""),window.lucide&&window.lucide.createIcons()}
