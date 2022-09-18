import { SearchPipe } from './search.pipe';
import { FillPipe } from './fill.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { MinuteSecondsPipe } from './minute-seconds.pipe';

export const EXAMIN_PIPES = [
    FillPipe,
    SearchPipe,
    SafeHtmlPipe,
    MinuteSecondsPipe
];
