import { Enum } from 'enumify';

import CalculateGlobalStats from './transformations/textitem/CalculateGlobalStats.jsx';
import CompactLines from './transformations/textitem/CompactLines.jsx';
import RemoveRepetitiveElements from './transformations/textitem/RemoveRepetitiveElements.jsx'
import VerticalToHorizontal from './transformations/textitem/VerticalToHorizontal.jsx';
import PostprocessLines from './transformations/textitem/PostprocessLines.jsx';
import DetectTOC from './transformations/textitem/DetectTOC.jsx'
import DetectListItems from './transformations/textitem/DetectListItems.jsx'
import DetectHeaders from './transformations/textitem/DetectHeaders.jsx'

import GatherBlocks from './transformations/textitemblock/GatherBlocks.jsx'
import DetectCodeQuoteBlocks from './transformations/textitemblock/DetectCodeQuoteBlocks.jsx'
import DetectListLevels from './transformations/textitemblock/DetectListLevels.jsx'
// import DetectFormats from './transformations/DetectFormats.jsx'
// import HeadlineToUppercase from './transformations/HeadlineToUppercase.jsx'
import ToTextBlocks from './transformations/ToTextBlocks.jsx';
import ToMarkdown from './transformations/ToMarkdown.jsx'

// Holds the state of the Application
export default class AppState {

    constructor(options) {
        this.renderFunction = options.renderFunction;
        this.mainView = View.UPLOAD;
        this.fileBuffer;
        this.pages = [];
        this.fontMap;
        this.transformations = [
            new CalculateGlobalStats(),
            new CompactLines(),
            new RemoveRepetitiveElements(),
            new VerticalToHorizontal(),
            new PostprocessLines(),
            new DetectTOC(),
            new DetectListItems(),
            new DetectHeaders(),

            new GatherBlocks(),
            new DetectCodeQuoteBlocks(),
            new DetectListLevels(),

            // new DetectFormats(),
            // new HeadlineToUppercase(),
            new ToTextBlocks(),
            new ToMarkdown()];

        //bind functions
        this.render = this.render.bind(this);
        this.storeFileBuffer = this.storeFileBuffer.bind(this);
        this.storePdfPages = this.storePdfPages.bind(this);
        this.switchMainView = this.switchMainView.bind(this);
    }

    render() {
        this.renderFunction(this)
    }

    // the uploaded pdf as file buffer
    storeFileBuffer(fileBuffer:ArrayBuffer) {
        this.fileBuffer = fileBuffer;
        this.mainView = View.LOADING;
        this.render()
    }

    storePdfPages(pages, fontMap) {
        this.pages = pages;
        this.fontMap = fontMap;
        this.fileBuffer = null;
        this.mainView = View.RESULT;
        this.render();
    }

    switchMainView(view) {
        this.mainView = view;
        this.render();
    }

}

export class View extends Enum {
}
View.initEnum(['UPLOAD', 'LOADING', 'RESULT', 'DEBUG'])