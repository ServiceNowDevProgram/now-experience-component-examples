export const CARDS = [
	{
		title: '<slot>',
		description:
			'A placeholder inside a web component that users can fill with their own markup',
		attributes: [
			{
				title: 'name',
				description: 'The name of the slot.'
			}
		]
	},
	{
		title: '<canvas>',
		description:
			'Use the HTML <canvas> element with either the canvas scripting API or the WebGL API to draw graphics and animations.',
		attributes: [
			{
				title: 'height',
				description:
					'The height of the coordinate space in CSS pixels. Defaults to 150.'
			},
			{
				title: 'width',
				description:
					'The width of the coordinate space in CSS pixels. Defaults to 300.'
			},
			{
				title: 'moz-opaque',
				description:
					'Lets the canvas know whether or not translucency will be a factor. If the canvas knows there\'s no translucency, painting performance can be optimized. This is only supported by Mozilla-based browsers; use the standardized canvas.getContext(\'2d\', { alpha: false }) instead.'
			}
		]
	},
	{
		title: '<title>',
		description:
			'The HTML Title element (<title>) defines the document\'s title that is shown in a browser\'s title bar or a page\'s tab. It only contains text and tags within the element are ignored.'
	}
];
