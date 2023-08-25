import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={490}
        viewBox="0 0 280 490"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="138" cy="132" r="114"/>
        <rect x="23" y="255" rx="0" ry="0" width="242" height="67"/>
        <rect x="21" y="337" rx="0" ry="0" width="245" height="72"/>
        <rect x="21" y="448" rx="0" ry="0" width="109" height="44"/>
        <rect x="160" y="443" rx="0" ry="0" width="105" height="70"/>
    </ContentLoader>
)

export default Skeleton

