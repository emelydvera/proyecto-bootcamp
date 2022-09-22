const React = require('react')
const { useState } = React
const Image = require("nordic/image");
const PropTypes = require("prop-types");
const { useI18n } = require("nordic/i18n");

const ProductSlider = ({ product }) => {

    const { pictures, title } = product
    const { i18n } = useI18n();

    const [mainImage, setMainImage] = useState(0);

    const handleOver = (i) => {
        setMainImage(i);
    };

    return (

        <div className="slider__img">
            <div className="slider__img__carousel">
                {pictures.length > 0 &&
                    pictures.map((p, i) => {
                        return (
                            i <= 6 && (
                                <div

                                    key={p.id}
                                    className={`image__container ${mainImage === i ? "active" : ""
                                        }`}
                                >
                                    <Image
                                        className="slider__image "
                                        onMouseOver={() => {
                                            handleOver(i);
                                        }}
                                        aria-label={i18n.gettext("imagen del producto")}
                                        src={p.secure_url}
                                        alt={title}
                                    />
                                </div>
                            )
                        );
                    })}
            </div>
            <figure
                tabIndex={9}
                aria-label={i18n.gettext("Imagen de {0}", title)}
            >
                <Image
                    src={pictures[mainImage].secure_url}
                    alt={i18n.gettext("product")}
                    lazyload={true}
                    className="slider__img__main"
                />
                <figcaption>{i18n.gettext(title)}</figcaption>
            </figure>
        </div>

    )
}

ProductSlider.proptypes = {
    product: PropTypes.shape({
        pictures: PropTypes.arrayOf(
            PropTypes.shape({
                secure_url: PropTypes.string,
            })
        ).isRequired,
        title: PropTypes.string.isRequired,
    })
}

module.exports = ProductSlider