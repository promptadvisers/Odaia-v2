import { create } from 'zustand';

interface UploadedFile {
  id: string;
  name: string;
  size: string;
  uploadedAt: Date;
}

interface BrandConfig {
  brand: {
    status: 'Ready' | 'Missing info' | 'Pending';
    tags: string[];
    description: string;
    approved: boolean;
  };
  brandAccess: {
    status: 'Ready' | 'Missing info' | 'Pending';
    pspProgram: string;
    finicalSupport: string;
    webPortal: string;
    marketAccess: string;
    approved: boolean;
  };
  salesGoals: {
    status: 'Ready' | 'Missing info' | 'Pending';
    approved: boolean;
  };
  competitiveLandscape: {
    status: 'Ready' | 'Missing info' | 'Pending';
    approved: boolean;
  };
}

interface AppState {
  // File management
  uploadedFiles: UploadedFile[];
  addFile: (file: File) => void;
  removeFile: (id: string) => void;
  
  // Brand configuration
  brandConfig: BrandConfig;
  updateBrandAccess: (data: Partial<BrandConfig['brandAccess']>) => void;
  approveBrandItem: (item: keyof BrandConfig) => void;
  
  // UI State
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  
  // Sidebar
  activeSidebarItem: string;
  setActiveSidebarItem: (item: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // File management
  uploadedFiles: [],
  addFile: (file) => set((state) => ({
    uploadedFiles: [...state.uploadedFiles, {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadedAt: new Date()
    }]
  })),
  removeFile: (id) => set((state) => ({
    uploadedFiles: state.uploadedFiles.filter(f => f.id !== id)
  })),
  
  // Brand configuration
  brandConfig: {
    brand: {
      status: 'Ready',
      tags: ['Oncology', 'Solid Tumors', 'Breast Cancer'],
      description: 'Within the oncology vertical, the therapeutic area of breast cancer includes the HER2+ indication, where the antibody-drug conjugate (ADC) drug class competes, and products progress through a life cycle from launch in 2L metastatic disease to expansion into earlier lines and adjacent populations',
      approved: false
    },
    brandAccess: {
      status: 'Missing info',
      pspProgram: 'OncoConnect PSP',
      finicalSupport: 'OncoThera Copay Card',
      webPortal: '',
      marketAccess: '',
      approved: false
    },
    salesGoals: {
      status: 'Ready',
      approved: false
    },
    competitiveLandscape: {
      status: 'Ready',
      approved: false
    }
  },
  updateBrandAccess: (data) => set((state) => ({
    brandConfig: {
      ...state.brandConfig,
      brandAccess: {
        ...state.brandConfig.brandAccess,
        ...data,
        status: data.webPortal && data.marketAccess ? 'Ready' : 'Missing info'
      }
    }
  })),
  approveBrandItem: (item) => set((state) => ({
    brandConfig: {
      ...state.brandConfig,
      [item]: {
        ...state.brandConfig[item],
        approved: true
      }
    }
  })),
  
  // UI State
  activeModal: null,
  setActiveModal: (modal) => set({ activeModal: modal }),
  
  // Theme
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),
  
  // Sidebar
  activeSidebarItem: 'documents',
  setActiveSidebarItem: (item) => set({ activeSidebarItem: item })
}));