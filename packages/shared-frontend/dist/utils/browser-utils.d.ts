/**
 * Frontend-specific browser utilities
 */
export declare const urlUtils: {
    getSearchParams(): URLSearchParams;
    getParam(name: string): string | null;
    updateParams(params: Record<string, string | null>): void;
    navigate(path: string, params?: Record<string, string>): void;
};
export declare const viewport: {
    getSize(): {
        width: number;
        height: number;
    };
    isInViewport(element: Element): boolean;
    scrollToElement(element: Element, behavior?: ScrollBehavior): void;
    scrollToTop(behavior?: ScrollBehavior): void;
};
export declare const device: {
    isMobile(): boolean;
    isIOS(): boolean;
    isAndroid(): boolean;
    isTouchDevice(): boolean;
    getPixelRatio(): number;
};
export declare const network: {
    isOnline(): boolean;
    onConnectionChange(callback: (isOnline: boolean) => void): () => void;
    getConnectionInfo(): any;
};
export declare const clipboard: {
    writeText(text: string): Promise<boolean>;
    readText(): Promise<string | null>;
};
export declare const performance: {
    mark(name: string): void;
    measure(name: string, startMark: string, endMark?: string): void;
    getTiming(name: string): PerformanceEntry | null;
};
