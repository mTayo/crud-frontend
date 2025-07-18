import React, { Suspense } from 'react';


// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component: React.ComponentType) => (props: Record<string, unknown>) =>
    (
        <Suspense fallback={<div>Loading</div>}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;