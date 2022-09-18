import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

    transform(value: number, completeFormat: any): string {

        if (completeFormat) {
            let totalSeconds = value;
            const hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            return this.pad(hours, 2) + ':' + this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
        }else {
            const minutes: number = Math.floor(value / 60);
            const seconds = (value - minutes * 60);
            return this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
        }
    }

    pad(n, width, z = null) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

}
