export type CustomizeSettings = {
  visibleDestinations: string[];
  visibleActivities: string[];
  featuredPackages: string[];
  hotelOptions: string[];
};

const STORAGE_KEY = 'hv_customize_settings_v1';

const defaultSettings: CustomizeSettings = {
  visibleDestinations: [
    'Dakhla','Marrakesh','Agadir','Casablanca','Fes','Rabat','Tangier','Essaouira','Chefchaouen','Ouarzazate','Meknes'
  ],
  visibleActivities: ['Kite Surfing', 'Desert Safari', 'Surf Lessons', 'Cultural Tour', 'Hammam & Spa'],
  featuredPackages: [],
  hotelOptions: ['Economy Hotel', 'Comfort Riad', 'Premium Resort']
};

export function getCustomizeSettings(): CustomizeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return { ...defaultSettings, ...parsed } as CustomizeSettings;
  } catch {
    return defaultSettings;
  }
}

export function setCustomizeSettings(next: Partial<CustomizeSettings>) {
  const current = getCustomizeSettings();
  const merged = { ...current, ...next };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new CustomEvent('customize_settings_updated', { detail: merged }));
}

export function resetCustomizeSettings() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('customize_settings_updated', { detail: defaultSettings }));
}

export function onCustomizeSettingsChange(handler: (s: CustomizeSettings)=>void) {
  const listener = (e: Event) => {
    const ce = e as CustomEvent<CustomizeSettings>;
    handler(ce.detail ?? getCustomizeSettings());
  };
  window.addEventListener('customize_settings_updated', listener);
  return () => window.removeEventListener('customize_settings_updated', listener);
}
