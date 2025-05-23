import { InitHeader } from '../components/header.js';
import { InitFooter } from '../components/footer.js';
import { InitMainContents } from '../components/mainContents.js';
import { InitModal } from '../components/modal.js';
import { InitNav } from '../components/nav.js';
import { BuildAuthSection } from '../components/auth.js';
import { BuildUserDropdown } from '../components/userDropdown.js';
import { lazyLoadMaps, loadLocationSelectHTML } from '../services/apiServices/mapServices.js'
;
/**
 * LayoutMain
 * builds the layout of the main page 
 */
function LayoutMain() {
	Promise.resolve()
  	.then(async () => { await lazyLoadMaps();})
  	.then(() => loadLocationSelectHTML());
	InitHeader();
	InitNav();
	InitModal();
	InitMainContents();
	InitFooter();
	const headerEle = document.getElementById('header');
    BuildAuthSection(headerEle);
    BuildUserDropdown();
};

// eslint-disable-next-line no-unused-vars
document.addEventListener("DOMContentLoaded", (e) => LayoutMain());
