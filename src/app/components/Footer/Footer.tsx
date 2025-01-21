import style from './footer.module.css'

const Footer = () => {
  return (
    <div className={`max-w-[1440px] mx-auto ${style.mainStyleDiv}`}>
            <div className={`flex justify-between px-[20px] ${style.MainChildStyle}`}>
            
                <div className={`${style.FooterChilds}`}>
                    <span className={`${style.FooterHeading}`}>Funiro.</span>
                    <ul className={`${style.FooterChildsUl} ${style.FirstChildLink}`}>
                        <li className={`${style.TextStyle}`}>400 University Drive Suite 200  Coral </li>
                        <li>Gables </li>
                        <li>FL 33134 USA</li>
                    </ul>
                </div>

                <div className={`${style.FooterChilds}`}>
                    <span className={`${style.FooterLinks}`}>Links</span>

                    <ul className={`${style.FooterChildsUl} ${style.SecondChildLink}`}>
                        <li>Home</li>
                        <li>Shop</li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
                </div>


                <div className={`${style.FooterChilds}`}>
                    <span className={`${style.FooterLinks}`}>Help</span>

                    <ul className={`${style.FooterChildsUl} ${style.SecondChildLink}`}>
                        <li>Payment Options</li>
                        <li>Returns</li>
                        <li>Privacy Policies</li>
                    </ul>
                </div>

                <div className={`${style.FooterChilds}`}>
                    <span className={`${style.FooterLinks}`}>Newsletter</span>

                    <ul className={`${style.FooterChildsUl} ${style.Subscribe}`}>
                        <input type="text" placeholder='Enter yur Email Address' className={`${style.Input} mt-3`}/>
                        <label htmlFor="" className={`${style.NewsLetterSubscribe}`}>SUBSCRIBE</label>
                    </ul>
                </div>
            </div>

            <div className={`w-[80%] ${style.bottom}`}>
                <p className={`${style.lastBottomStyle}`}>2023 furino. All rights reverved</p>
            </div>
    </div>
  )
}

export default Footer