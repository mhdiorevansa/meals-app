const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/js/main.js",
	mode: "production",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "images/",
						},
					},
				],
			},
		],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, "src"),
			publicPath: "/",
		},
	},
};
