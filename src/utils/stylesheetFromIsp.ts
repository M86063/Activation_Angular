import { ISP } from 'src/app/shared/Models/Isp';

export const getStylesheetFromIsp = (isp: ISP) => `scss/${isp}/${isp}.scss`;
