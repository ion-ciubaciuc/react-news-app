import { Card } from "@/components";

type UnauthenticatedLayoutProps = {
    children: React.ReactNode;
};

export default function AuthLayout({ children }: UnauthenticatedLayoutProps) {
    return (
        <main className="grid place-items-center min-h-screen px-4 py-12">
            <div className="max-w-md w-full">
                <Card>{children}</Card>
            </div>
        </main>
    );
}
