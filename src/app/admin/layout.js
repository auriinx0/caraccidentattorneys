export const metadata = {
    title: 'Admin Dashboard',
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {children}
        </div>
    );
}
