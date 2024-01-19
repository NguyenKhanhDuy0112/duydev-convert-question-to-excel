const { override, useBabelRc, addWebpackModuleRule } = require("customize-cra")

module.exports = override(
    useBabelRc(),
    addWebpackModuleRule({
        test: /\.svg$/,
        exclude: /@ckeditor/, // exclude CKEditor's SVG files
        use: ["@svgr/webpack"], // replace with your SVG loader or transformer
    }),
    addWebpackModuleRule({
        test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
        use: ["raw-loader"],
    })
)
