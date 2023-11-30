import { useAuth } from "@/hooks/user";

import { Button, Link } from '@/components'

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 shadow-lg">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between gap-4 mx-auto p-4">
                {user ? (
                    <Button color="secondary" onClick={logout}>Log out</Button>
                ) : (
                    <>
                        <Link href="/login">Log in</Link>
                        <Link href="/register">Register</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header;
