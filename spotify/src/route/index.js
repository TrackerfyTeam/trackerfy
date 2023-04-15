import login from '../../public/index.html';
import year from '../../public/pages/year.html';

export default [
    {path: '/', component: login},
    {path: '/callback', component: year},
]