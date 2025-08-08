import { AnalgesicsAntiinflammatoriesIcon } from "@/components/core/icons/categories/analgesics-antiinflammatories-icon"
import { AntiinfectivesIcon } from "@/components/core/icons/categories/anti-infectives-icon"
import { AntiallergicsIcon } from "@/components/core/icons/categories/antiallergics-icon"
import { AntidiarrhealsLaxativesIcon } from "@/components/core/icons/categories/antidiarrheals-laxatives-icon"
import { AntipyreticsIcon } from "@/components/core/icons/categories/antipyretics-icon"
import { AntiulcerDrugsAntacidsIcon } from "@/components/core/icons/categories/antiulcer-drugs-antacids-icon"
import { ItaminsIcon } from "@/components/core/icons/categories/itamins-icon"
import { MucolyticsAntitussivesIcon } from "@/components/core/icons/categories/mucolytics-antitussives-icon"
import { VitaminsIcon } from "@/components/core/icons/categories/vitamins-icon"

export const CATEGORY_ICONS = {
  'analgesics-antiinflammatories-icon': AnalgesicsAntiinflammatoriesIcon,
  'anti-infectives-icon': AntiinfectivesIcon,
  'antiallergics-icon': AntiallergicsIcon,
  'antidiarrheals-laxatives-icon': AntidiarrhealsLaxativesIcon,
  'antipyretics-icon': AntipyreticsIcon,
  'antiulcer-drugs-antacids-icon': AntiulcerDrugsAntacidsIcon,
  'itamins-icon': ItaminsIcon,
  'mucolytics-antitussives-icon': MucolyticsAntitussivesIcon,
  'vitamins-icon': VitaminsIcon
}

export interface ICategory {
  id: string, name: string, icon: keyof typeof CATEGORY_ICONS
}


