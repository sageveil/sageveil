export interface PortGeneratorSchema {
  name: string;
  displayName?: string;
  description?: string;
  tags?: string[] | string;
  templateFile?: string;
  skipInstall?: boolean;
  skipFormat?: boolean;
}
