import { AnalgesicsAntiinflammatoriesIcon } from "@/components/core/icons/analgesics-antiinflammatories-icon"
import { AntiinfectivesIcon } from "@/components/core/icons/anti-infectives-icon"
import { AntiallergicsIcon } from "@/components/core/icons/antiallergics-icon"
import { AntidiarrhealsLaxativesIcon } from "@/components/core/icons/antidiarrheals-laxatives-icon"
import { AntipyreticsIcon } from "@/components/core/icons/antipyretics-icon"
import { AntiulcerDrugsAntacidsIcon } from "@/components/core/icons/antiulcer-drugs-antacids-icon"
import { ItaminsIcon } from "@/components/core/icons/itamins-icon"
import { MucolyticsAntitussivesIcon } from "@/components/core/icons/mucolytics-antitussives-icon"
import { VitaminsIcon } from "@/components/core/icons/vitamins-icon"

export const CATEGORY_ICONS = {
  'analgesics-antiinflammatories-icon': AnalgesicsAntiinflammatoriesIcon,
  'anti-infectives-icon': AntiinfectivesIcon,
  'antiallergics-icon': AntiallergicsIcon,
  'antidiarrheals-laxatives-icon': AntidiarrhealsLaxativesIcon,
  'antipyretics-icon': AntipyreticsIcon,
  'antiulcer-drugs-antacids-icon': AntiulcerDrugsAntacidsIcon,
  'itamins-icon': ItaminsIcon,
  'mucolytics-antitussives-icon': MucolyticsAntitussivesIcon,
  'vitamins-icon':VitaminsIcon
}

export interface ICategory {
  id: string, name: string, icon: string
}


