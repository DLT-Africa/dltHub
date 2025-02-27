import Image from 'next/image'

import dltImage from "../../../public/DLTHUB WHITE 1.png"

const Nav = () => {
  return (
   <header className='flex items-center fixed custom-gradient justify-start h-[95px] px-[50px] py-[30px] w-full border-b-[1px] border-[#EFFFE2] z-10'>
     <Image
          src={dltImage}
          width={135.07}
          height={33}
        />
   </header>
  )
}

export default Nav
