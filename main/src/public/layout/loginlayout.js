/* eslint-disable no-unused-vars */
import { InitHeader } from '../components/header.js';
import { InitFooter } from '../components/footer.js';
import { InitMainContents } from '../components/mainContents.js';
import { InitModal } from '../components/modal.js';
import { InitNav } from '../components/nav.js';
import { BuildAuthSection } from '../components/auth.js';
import { BuildUserDropdown } from '../components/userDropdown.js';
/**
 * LayoutMain
 * builds the layout of the main page 
 */
function LayoutMain() {
	InitHeader();
	InitNav();
	InitModal();
	InitMainContents();
	InitFooter();
    BuildAuthSection();
    BuildUserDropdown();
};

document.addEventListener("DOMContentLoaded", (e) => LayoutMain());