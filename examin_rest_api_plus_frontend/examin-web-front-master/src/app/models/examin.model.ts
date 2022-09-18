// Type definitions for ExamIn
interface ExamIn {
    LoggedIn: boolean;
    Admin?: boolean;
    Moderator?: boolean;
    user: any;
    cdn_url: string;
    cdn_assets_url: string;
    site_url: string;
    notifications_count: number;
    socket_server: string;
    languages: any;
    language: any;
}

interface Window {
    ExamIn: ExamIn;
}

declare var window: Window;
