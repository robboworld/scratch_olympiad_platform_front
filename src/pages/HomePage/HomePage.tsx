import { ACCESS_TOKEN, PROFILE_PAGE_ROUTE, LOGIN_PAGE_ROUTE } from '@/consts';

import { Navigate } from 'react-router-dom';

function HomePage() {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return <Navigate to={PROFILE_PAGE_ROUTE} />
    }
    return (
        <div>
            <Navigate to={LOGIN_PAGE_ROUTE} />
        </div>
    );
}

export default HomePage;