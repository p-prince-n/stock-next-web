import Link from 'next/link'
import React from 'react'

const FooterLink = ({text, linkText, href}: FooterLinkProps) => {
  return (
    <div className='text-center pt-4'>
        <div className="text-sm text-gray-500">
            {text}{` `}
            <Link href={href} className='footer-link' >
            {linkText}
            </Link>
        </div>
    </div>
  )
}

export default FooterLink