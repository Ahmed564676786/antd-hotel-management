


export function Protected({children}){

    const { isLoading, isAuthenticated } = useUser();
    if (isLoading) return <Spin fullscreen />;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;

}