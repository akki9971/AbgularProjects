import { RouteInfo } from './sidebar.metadata';

export const USER_ROUTES: RouteInfo[] = [
    {
        path: '/dashboard', title: 'Dashboard', icon: 'ft-grid', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/user/:userId/view', title: 'Profile', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    // {
    //     path: 'javascript:void()', title: 'Profile', icon: 'ft-user', class: 'has-sub', badge: '', badgeClass: 'float-right mr-1 mt-1', isExternalLink: false,
    //     submenu: [
    //         { path: '/user/:userId/view', title: 'View Profile', icon: 'ft-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //         { path: '/user/:userId/edit', title: 'Edit Profile', icon: 'ft-edit', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    //     ]
    // },
    // {
    //     path: '/exam', title: 'Exams', icon: 'ft-monitor', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    // {
    //     path: '/result', title: 'Result', icon: 'ft-check-square', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    // {
    //     path: '/notification', title: 'Notification', icon: 'ft-bell', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    {
        path: '/user/exams', title: 'Exams', icon: 'ft-edit', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/page/exam-instruction', title: 'Exam Instruction', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/auth/logout', title: 'Logout', icon: 'ft-lock', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    // {
    //     path: '/page/static', title: 'Static Page', icon: 'ft-list', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
];
