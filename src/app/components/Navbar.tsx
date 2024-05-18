import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "./Logout";
import styles from "../../style.module.css";

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div> 
      <nav className={styles.nav}>
      <h3 className={styles.logo}>
          Hedy
      </h3>
        <ul> 
          <li>
            <Link href="/"  className={styles.link}>
             Home
            </Link>
          </li>
          {!session?.user ? (
            <li>
              <Link href="/auth/login"  className={styles.link}>
                Log in
              </Link>
            </li>
          ) : (
            <>
             <li>
              <Link href="/dashboard"  className={styles.link}>
                  Dashboard
              </Link>
            </li>
            <li>
              <Logout />
            </li>
            </>
          )}
          {!session && (
            <li>
              <Link href="/auth/register" className={styles.link}>
                  Sign up
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
