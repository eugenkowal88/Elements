export interface Element {
  name: string;
  symbol: string;
  number: number;
  atomic_mass: number;
  category: string;
  phase: string;
  density: number | null;
  melt: number | null;
  boil: number | null;
  molar_heat: number | null;
  period: number;
  group: number;
  block: string;
  electron_configuration: string;
  electron_configuration_semantic: string;
  electronegativity_pauling: number | null;
  electron_affinity: number | null;
  ionization_energies: number[];
  shells: number[];
  discovered_by: string | null;
  named_by: string | null;
  source: string;
  summary: string;
  appearance: string | null;
  xpos: number;
  ypos: number;
  cpk_hex: string | null;
}

export interface CategoryStyle {
  bg: string;
  darkBg: string;
  border: string;
  text: string;
}
