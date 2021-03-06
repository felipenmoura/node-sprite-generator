'use strict';

var expect = require('chai').expect,
    _ = require('underscore'),
    diagonal = require('../../../lib/layout/diagonal.js');

describe('Layout/Diagonal', function () {
    var images = [
        { path: 'foo', width: 150, height: 12 },
        { path: 'bar', width: 32, height: 32 },
        { path: 'bla', width: 112, height: 112 }
    ];

    it('should generate the correct layout when a padding is specified', function () {
        var options = { scaling: 1, padding: 50 };

        return diagonal(images, options).then(function (layout) {
            expect(layout).to.deep.equal({
                width: 394,
                height: 256,
                images: [
                    _({ x: 0, y: 0 }).extend(images[0]),
                    _({ x: 200, y: 62 }).extend(images[1]),
                    _({ x: 282, y: 144 }).extend(images[2])
                ]
            });
            expect(layout.images[0]).not.to.equal(images[0]);
        });
    });

    it('should generate the correct layout when a scaling is specified', function () {
        var options = { scaling: 0.7, padding: 0 };

        return diagonal(images, options).then(function (layout) {
            expect(layout).to.deep.equal({
                width: 205,
                height: 108,
                images: [
                    { x: 0, y: 0, width: 105, height: 8, path: 'foo' },
                    { x: 105, y: 8, width: 22, height: 22, path: 'bar' },
                    { x: 127, y: 30, width: 78, height: 78, path: 'bla' }
                ]
            });
            expect(layout.images[0]).not.to.equal(images[0]);
        });
    });

});
