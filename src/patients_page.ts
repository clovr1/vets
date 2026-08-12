import { seedDatabaseIfEmpty, subscribePatients, Patient } from './firebase';
import { initSidebarProfile } from './auth';

export interface OwnerGroup {
  owner_name: string;
  code: string;
  phone: string;
  address: string;
  pets: Patient[];
}

let allPatients: Patient[] = [];
let filteredOwners: OwnerGroup[] = [];
let selectedOwnerKey: string | null = null;
let currentOwnerPage = 1;
const ownersPerPage = 5;

// Color generator for avatar circles
const AVATAR_COLORS = [
  'bg-emerald-600 text-white',
  'bg-indigo-600 text-white',
  'bg-purple-600 text-white',
  'bg-amber-600 text-white',
  'bg-teal-600 text-white',
  'bg-rose-600 text-white'
];

function getAvatarColorClass(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}

function getPetInitials(name: string): string {
  if (!name) return 'PT';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

document.addEventListener('DOMContentLoaded', async () => {
  initSidebarProfile();
  await seedDatabaseIfEmpty();

  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  const speciesFilter = document.getElementById('speciesFilter') as HTMLSelectElement | null;
  const statusFilter = document.getElementById('statusFilter') as HTMLSelectElement | null;
  const lastVisitFilter = document.getElementById('lastVisitFilter') as HTMLSelectElement | null;

  const onFilterChange = () => {
    currentOwnerPage = 1;
    processAndRenderData();
  };

  if (searchInput) searchInput.addEventListener('keyup', onFilterChange);
  if (speciesFilter) speciesFilter.addEventListener('change', onFilterChange);
  if (statusFilter) statusFilter.addEventListener('change', onFilterChange);
  if (lastVisitFilter) lastVisitFilter.addEventListener('change', onFilterChange);

  // Pagination buttons
  const prevBtn = document.getElementById('ownerPrevBtn');
  const nextBtn = document.getElementById('ownerNextBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentOwnerPage > 1) {
        currentOwnerPage--;
        renderOwnerList();
      }
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxPage = Math.ceil(filteredOwners.length / ownersPerPage) || 1;
      if (currentOwnerPage < maxPage) {
        currentOwnerPage++;
        renderOwnerList();
      }
    });
  }

  subscribePatients((patients) => {
    allPatients = patients;
    processAndRenderData();
  });
});

function processAndRenderData() {
  const searchInput = document.getElementById('searchInput') as HTMLInputElement | null;
  const speciesFilter = document.getElementById('speciesFilter') as HTMLSelectElement | null;
  const statusFilter = document.getElementById('statusFilter') as HTMLSelectElement | null;

  const query = (searchInput?.value || '').toLowerCase().trim();
  const speciesVal = (speciesFilter?.value || 'all').toLowerCase();
  const statusVal = (statusFilter?.value || 'all').toLowerCase();

  // Group by owner
  const ownerMap = new Map<string, OwnerGroup>();

  allPatients.forEach(p => {
    const rawOwner = p.owner_name ? p.owner_name.trim() : 'Tanpa Nama';
    const key = rawOwner.toLowerCase();

    if (!ownerMap.has(key)) {
      ownerMap.set(key, {
        owner_name: rawOwner,
        code: p.code || '#VET-000',
        phone: p.phone && p.phone !== '-' ? p.phone : '+62 813 9876 5432',
        address: p.address || '-',
        pets: [p]
      });
    } else {
      const existing = ownerMap.get(key)!;
      existing.pets.push(p);
      if (p.phone && p.phone !== '-') existing.phone = p.phone;
      if (p.address && p.address !== '-') existing.address = p.address;
    }
  });

  const allGroups = Array.from(ownerMap.values());

  // Filter groups
  filteredOwners = allGroups.filter(g => {
    const matchQuery = !query || 
      g.owner_name.toLowerCase().includes(query) ||
      g.code.toLowerCase().includes(query) ||
      g.phone.toLowerCase().includes(query) ||
      g.pets.some(p => p.name.toLowerCase().includes(query) || p.breed?.toLowerCase().includes(query));

    const matchSpecies = speciesVal === 'all' || g.pets.some(p => p.species.toLowerCase().includes(speciesVal));
    const matchStatus = statusVal === 'all' || g.pets.some(p => p.status.toLowerCase().includes(statusVal));

    return matchQuery && matchSpecies && matchStatus;
  });

  // Select first owner if none selected or if selected key is no longer in filtered list
  if (filteredOwners.length > 0) {
    const exists = filteredOwners.some(g => g.owner_name.toLowerCase() === selectedOwnerKey);
    if (!exists || !selectedOwnerKey) {
      selectedOwnerKey = filteredOwners[0].owner_name.toLowerCase();
    }
  } else {
    selectedOwnerKey = null;
  }

  renderOwnerList();
  renderSelectedOwnerPets();
}

function renderOwnerList() {
  const container = document.getElementById('ownerListContainer');
  const paginationText = document.getElementById('ownerPaginationText');
  const prevBtn = document.getElementById('ownerPrevBtn') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('ownerNextBtn') as HTMLButtonElement | null;

  if (!container) return;

  if (filteredOwners.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10 text-slate-400 text-xs font-medium">
        Tidak ada pemilik yang cocok.
      </div>
    `;
    if (paginationText) paginationText.textContent = '0 of 0';
    if (prevBtn) prevBtn.disabled = true;
    if (nextBtn) nextBtn.disabled = true;
    return;
  }

  const totalPages = Math.ceil(filteredOwners.length / ownersPerPage) || 1;
  if (currentOwnerPage > totalPages) currentOwnerPage = totalPages;
  if (currentOwnerPage < 1) currentOwnerPage = 1;

  const startIdx = (currentOwnerPage - 1) * ownersPerPage;
  const endIdx = Math.min(startIdx + ownersPerPage, filteredOwners.length);
  const pageOwners = filteredOwners.slice(startIdx, endIdx);

  if (paginationText) {
    paginationText.textContent = `${startIdx + 1}-${endIdx} of ${filteredOwners.length}`;
  }
  if (prevBtn) prevBtn.disabled = currentOwnerPage === 1;
  if (nextBtn) nextBtn.disabled = currentOwnerPage === totalPages;

  container.innerHTML = pageOwners.map((owner, idx) => {
    const key = owner.owner_name.toLowerCase();
    const isSelected = key === selectedOwnerKey;

    // Pet names preview line (e.g., "4 Pets · Kelamin Yamal, Max, Koko +1")
    const petCount = owner.pets.length;
    let petNamesStr = owner.pets.map(p => p.name).slice(0, 3).join(', ');
    if (petCount > 3) {
      petNamesStr += ` +${petCount - 3}`;
    }
    const petSummaryLine = `${petCount} ${petCount === 1 ? 'Pet' : 'Pets'} · ${petNamesStr}`;

    // Pet Avatar Badges
    const petPillsHtml = owner.pets.map((p, pIdx) => {
      const initials = getPetInitials(p.name);
      const colorClass = getAvatarColorClass(pIdx);
      return `
        <span class="w-6 h-6 rounded-full ${colorClass} text-[10px] font-extrabold flex items-center justify-center shrink-0 border border-white shadow-2xs" title="${p.name} (${p.species})">
          ${initials}
        </span>
      `;
    }).join('');

    const activeStyles = isSelected 
      ? 'bg-slate-100 text-slate-900 border border-slate-300 font-semibold shadow-2xs' 
      : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80';

    return `
      <div onclick="selectOwner('${owner.owner_name.replace(/'/g, "\\'")}')" class="p-3.5 rounded-xl cursor-pointer transition-all ${activeStyles}">
        <div class="flex items-center justify-between gap-2">
          <h3 class="font-bold text-xs text-slate-900 truncate">${owner.owner_name}</h3>
          <span class="font-mono text-[10px] text-slate-400 font-semibold shrink-0">${owner.code}</span>
        </div>
        <p class="text-[11px] text-slate-500 truncate mt-1">${petSummaryLine}</p>
        <div class="flex items-center gap-1 mt-2.5">
          ${petPillsHtml}
        </div>
      </div>
    `;
  }).join('');
}

(window as any).selectOwner = (ownerName: string) => {
  selectedOwnerKey = ownerName.toLowerCase();
  renderOwnerList();
  renderSelectedOwnerPets();
};

function renderSelectedOwnerPets() {
  const nameElem = document.getElementById('selectedOwnerName');
  const detailsElem = document.getElementById('selectedOwnerDetails');
  const countElem = document.getElementById('selectedPetsCount');
  const gridContainer = document.getElementById('petCardsGrid');
  const addPetBtn = document.getElementById('addPetForOwnerBtn');

  if (!gridContainer) return;

  const currentOwner = filteredOwners.find(g => g.owner_name.toLowerCase() === selectedOwnerKey);

  if (!currentOwner) {
    if (nameElem) nameElem.textContent = 'Pilih Pemilik';
    if (detailsElem) detailsElem.textContent = 'Silakan pilih pemilik dari daftar di sebelah kiri.';
    if (countElem) countElem.textContent = '0';
    if (addPetBtn) addPetBtn.classList.add('hidden');
    gridContainer.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-400 text-xs font-medium">
        Belum ada pemilik yang dipilih.
      </div>
    `;
    return;
  }

  // Update Header Info
  if (nameElem) nameElem.textContent = currentOwner.owner_name;
  if (detailsElem) detailsElem.innerHTML = `<span class="font-mono text-slate-500">${currentOwner.code}</span> <span class="ml-2 text-slate-500 font-medium">📞 ${currentOwner.phone}</span>`;
  if (countElem) countElem.textContent = currentOwner.pets.length.toString();

  if (addPetBtn) {
    addPetBtn.classList.add('hidden');
  }

  // Render Pet Cards Stack (Matching exact screenshot design)
  gridContainer.className = 'flex flex-col space-y-4';

  const avatarColors = [
    'bg-rose-100 text-rose-800 border border-rose-200/80',
    'bg-emerald-100 text-emerald-800 border border-emerald-200/80',
    'bg-purple-100 text-purple-800 border border-purple-200/80',
    'bg-amber-100 text-amber-800 border border-amber-200/80'
  ];

  gridContainer.innerHTML = currentOwner.pets.map((p, idx) => {
    const initials = getPetInitials(p.name);
    const avatarColor = avatarColors[idx % avatarColors.length];
    
    const breedText = p.breed ? `${p.breed}` : p.species;
    const ageText = p.age ? `${p.age}` : '1';
    
    // Format last visit date like YYYY-MM-DD or as stored in database
    const rawLastVisit = p.last_visit || '2026-08-12';
    const lastVisitText = rawLastVisit.includes('T') ? rawLastVisit.split('T')[0] : rawLastVisit;

    const statusText = p.status || 'Menunggu Pemeriksaan';

    // Medical highlights pill badge logic
    let medicalHighlightHtml = `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold">
        <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-500"></i> ${statusText}
      </span>
    `;

    if (p.notes && p.notes.length > 0 && !p.notes.toLowerCase().includes('sehat')) {
      medicalHighlightHtml = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/80 text-xs font-semibold">
          <i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-500"></i> ${p.notes.slice(0, 30)}
        </span>
      `;
    } else if (statusText.toLowerCase().includes('sehat')) {
      medicalHighlightHtml = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-500"></i> Sehat (Tidak Ada Catatan)
        </span>
      `;
    }

    // Button label
    const isCompleted = statusText.toLowerCase().includes('sehat') || statusText.toLowerCase().includes('selesai');
    const buttonLabel = isCompleted ? 'Selesai' : 'Belum Selesai';
    const buttonIcon = isCompleted ? 'check-circle-2' : 'clock';

    return `
      <div class="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 transition-all shadow-2xs hover:border-slate-300">
        <!-- Top Row: Avatar, Pet Info (Name, Species·Breed·Age), and Top Right Status Text -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-3.5">
            <div class="w-10 h-10 rounded-full ${avatarColor} font-bold text-xs flex items-center justify-center shrink-0">
              ${initials}
            </div>
            <div>
              <h4 class="font-bold text-sm text-slate-900 leading-tight">${p.name}</h4>
              <p class="text-xs text-slate-500 font-medium mt-0.5">
                ${p.species} · ${breedText} · ${ageText}
              </p>
            </div>
          </div>

          <!-- Top Right Plain Status Text (Matching Screenshot) -->
          <span class="text-xs text-slate-700 font-medium pt-0.5">
            ${statusText}
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
              <span>${lastVisitText}</span>
            </div>
          </div>

          <div>
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
              MEDICAL HIGHLIGHTS
            </span>
            <div>
              ${medicalHighlightHtml}
            </div>
          </div>
        </div>

        <!-- Bottom Row: Full Width Status Button (Links to Patient Intake) -->
        <a href="patient.html?id=${p.id}" class="w-full bg-slate-50/80 hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-2 transition-all shadow-2xs group">
          <i data-lucide="${buttonIcon}" class="w-4 h-4 text-slate-500 group-hover:text-slate-800 transition-colors"></i>
          <span>${buttonLabel}</span>
        </a>
      </div>
    `;
  }).join('');

  if ((window as any).lucide) {
    (window as any).lucide.createIcons();
  }
}
