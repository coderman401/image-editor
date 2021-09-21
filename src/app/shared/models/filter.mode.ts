export class Filter {
    name: string;
    style: string;
    filterParams: FilterParams;
    generatedFilter: string;
}

export class FilterParams {
    sepia: number;
    brightness: number;
    saturate: number;
    contrast: number;
    hueRotate: number;
    grayScale: number;
}
