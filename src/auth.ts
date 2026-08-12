export interface UserProfile {
  id: string;
  role: 'doctor' | 'front_office';
  name: string;
  email: string;
  title: string;
  avatar: string;
  nip_sip: string;
  phone: string;
  shift: string;
  specialization: string;
  bio: string;
  joined_date: string;
}

export const ACCOUNTS: Record<'doctor' | 'front_office', UserProfile> = {
  doctor: {
    id: 'doc-01',
    role: 'doctor',
    name: 'Dr. Sarah Jenkins, DVM',
    email: 'doctor@vet.com',
    title: 'Lead Veterinarian & Specialist Surgeon',
    avatar: 'SJ',
    nip_sip: '503/SIP-VET/2026/014',
    phone: '+62 812 8888 7777',
    shift: 'Senin - Jumat (08.00 - 16.00 WIB)',
    specialization: 'Bedah Hewan Kecil, Feline & Canine Medicine',
    bio: 'Dokter hewan senior berpengalaman 10+ tahun dalam penanganan bedah jaringan lunak, diagnosa penyakit dalam, dan evaluasi rekam medis hewan kesayangan.',
    joined_date: '15 Jan 2021'
  },
  front_office: {
    id: 'fo-01',
    role: 'front_office',
    name: 'Siti Rahma, A.Md',
    email: 'frontoffice@vet.com',
    title: 'Head of Front Office & Patient Admission',
    avatar: 'SR',
    nip_sip: 'FO-2026-088',
    phone: '+62 813 5555 4444',
    shift: 'Senin - Sabtu (07.00 - 15.00 WIB)',
    specialization: 'Customer Care, Registrasi Pasien & Dispatch Farmasi',
    bio: 'Penanggung jawab utama alur penerimaan pasien, pendaftaran hewan baru, pengelolaan jadwal konsultasi dokter, dan layanan informasi pelanggan.',
    joined_date: '10 Feb 2023'
  }
};

export function getCurrentUser(): UserProfile {
  const stored = localStorage.getItem('vet_user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse vet_user', e);
    }
  }
  // Default to front_office if not set
  return ACCOUNTS.front_office;
}

export function setCurrentUser(role: 'doctor' | 'front_office') {
  const user = ACCOUNTS[role];
  localStorage.setItem('vet_user', JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem('vet_user');
  window.location.href = 'login.html';
}

export function initSidebarProfile() {
  const user = getCurrentUser();
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // 1. Update Brand Subtitle
  const brandSub = document.getElementById('sidebarBrandSub');
  if (brandSub) {
    brandSub.textContent = user.role === 'doctor' ? 'Portal Dokter Hewan' : 'Front Office & Pendaftaran';
  }

  // 2. Render Sidebar Nav with 3 Main Items (as in Image 1)
  const navElem = document.getElementById('sidebarNav') || document.querySelector('aside nav');
  if (navElem) {
    const mainMenus = [
      { href: 'index.html', icon: 'layout-grid', label: 'Overview Utama' },
      { href: 'patients.html', icon: 'users', label: 'Daftar Pasien' },
      { href: 'patient.html?id=pt-01', icon: 'hotel', label: 'Rawat Inap' }
    ];

    navElem.innerHTML = `
      <div class="px-2 mb-2">
        <span class="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block px-2">
          MENU UTAMA
        </span>
      </div>
      <div class="space-y-1">
        ${mainMenus.map(item => {
          const isActive = currentPath === item.href || (currentPath === '' && item.href === 'index.html');
          const activeClass = isActive 
            ? 'bg-emerald-100/70 text-emerald-950 font-bold border border-emerald-200/80 shadow-2xs' 
            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium';
          const iconColor = isActive ? 'text-emerald-800' : 'text-slate-400';

          return `
            <a href="${item.href}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${activeClass}">
              <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0 ${iconColor}"></i>
              <span>${item.label}</span>
            </a>
          `;
        }).join('')}
      </div>
    `;
  }

  // 3. Update User Bottom Profile Card
  const avatarElem = document.getElementById('sidebarAvatar');
  const nameElem = document.getElementById('sidebarUserName');
  const titleElem = document.getElementById('sidebarUserTitle');
  const roleBadgeElem = document.getElementById('sidebarRoleBadge');
  const logoutBtnElem = document.getElementById('sidebarLogoutBtn');

  if (avatarElem) avatarElem.textContent = user.avatar;
  if (nameElem) nameElem.textContent = user.name;
  if (titleElem) titleElem.textContent = user.title;

  if (roleBadgeElem) {
    if (user.role === 'doctor') {
      roleBadgeElem.className = 'inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300 leading-none truncate';
      roleBadgeElem.textContent = '👨‍⚕️ Dokter Hewan';
    } else {
      roleBadgeElem.className = 'inline-flex items-center px-2 py-0.5 text-[10px] font-bold rounded-md bg-blue-100 text-blue-800 border border-blue-300 leading-none truncate';
      roleBadgeElem.textContent = '📋 Front Office';
    }
  }

  if (logoutBtnElem) {
    logoutBtnElem.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }

  // 4. Update Header Elements if available
  const headerUserName = document.getElementById('headerUserName');
  const headerUserRole = document.getElementById('headerUserRole');
  if (headerUserName) headerUserName.textContent = user.name;
  if (headerUserRole) headerUserRole.textContent = user.role === 'doctor' ? 'Dokter Praktik' : 'Front Office';

  // 5. Re-initialize Lucide Icons if available
  if (typeof (window as any).lucide !== 'undefined') {
    (window as any).lucide.createIcons();
  }
}

