import { RouteInfo } from './sidebar.metadata';

export const ADMIN_ROUTES: RouteInfo[] = [
    {
        path: '/admin/dashboard', title: 'Dashboard', icon: 'ft-grid', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/user', title: 'Users', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    // {
    //     path: '/payment', title: 'Payments', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    {
        path: 'javascript:void()', title: 'Payments', icon: 'ft-list', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
        submenu: [
            { path: '/payment/', title: 'Show All', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/payment/create', title: 'Create', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: 'javascript:void()', title: 'Exam', icon: 'ft-list', class: 'has-sub', badge: '', badgeClass: 'float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '/exam/create', title: 'Create', icon: 'ft-file', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/exam', title: 'Show All', icon: 'ft-edit', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/result/search', title: 'Search Result', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: 'javascript:void()', title: 'Question Bank', icon: 'ft-list', class: 'has-sub', badge: '', badgeClass: 'float-right mr-1 mt-1', isExternalLink: false,
        submenu: [
            { path: '/question-bank/categories', title: 'Category List', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/question-bank/category/add', title: 'Add Category', icon: 'ft-plus', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/question-bank/questions', title: 'Questions', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/question-bank/question/add', title: 'Add Question', icon: 'ft-plus', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
            { path: '/question-bank/question/import', title: 'Import Result', icon: 'ft-search', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
        ]
    },
    {
        path: '/page/static', title: 'Static Page', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
];
