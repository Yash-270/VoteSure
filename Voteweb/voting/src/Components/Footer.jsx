import { NavLink, Outlet } from "react-router"

export const Footer=()=>{
    return(
        <footer className="bg-black text-gray-300 mt-10">
            <div className="max-w-6xl mx-auto px-6 py-6
                      flex flex-col md:flex-row
                      justify-between items-center gap-4">
            <div className="grid md:grid-cols-3 gap-8">
            <div>
            <h3 className="text-white font-semibold mb-3">
              Contact
            </h3>
            <p className="text-sm">📞 +91 7827939057</p>
            <p className="text-sm mt-1">✉️ support@VoteSure.com</p>
          </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">
                Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                    <li>
                    <NavLink to="/" className="hover:text-white">Home</NavLink>
                    </li>
                    <li>
                    <NavLink to="/about" className="hover:text-white">About</NavLink>
                    </li>
                </ul>
                </div>
            <div>
            <h3 className="text-white font-semibold mb-3">
              Social
            </h3>
            <ul className="space-y-2 text-sm">
              <li>📷 Instagram: <span className="text-white">@itsya.sh</span></li>
              <li>💬 WhatsApp: +91 7827939057</li>
            </ul>
            </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-7 flex flex-col justify-between items-center text-sm">

                <p>
                    © {new Date().getFullYear()} VoteSure
                </p>

                <p className="text-gray-400 mt-2 md:mt-0">
                    Built with ❤️ using MERN
                </p>
                </div>
                
            </div>
            <Outlet/>
        </footer>
    )
}