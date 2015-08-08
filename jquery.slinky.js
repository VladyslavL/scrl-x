/*
 * Slinky.js v0.1.3
 * 
 * Copyright (c) 2015 Sorin Iclanzan
 * Licensed under the MIT license.
 */

(function ($, window, undefined) {
    'use strict';

    var pluginName = 'slinky';

    var slinky = $.fn[pluginName] = function (options) {
        options = $.extend({}, slinky.options, options);

        return this.each(function () {
            var $element = $(this);
            // Prevent multiple instantiations on the same element.
            if ($element.data(pluginName)) {
                return;
            }
            $element.data(pluginName, true);

            var $scroller = $element.children().first();
            var $sections, headers, scrollerHeight, timer,
                lastScroll = 0,
                direction = 'UP';

            function refresh() {
                var st = $(this).scrollTop();
                if (st > lastScroll) {
                    direction = "DOWN";
                } else {
                    direction = "UP";
                }
                lastScroll = st;

                headers.forEach(function (header) {
                    var position = '';
                    var top = header.$parent.position().top;

                    if (top <= header.top + header.height / 2) {
                        position = 'top';
                    }
                    else if (top + header.height >= scrollerHeight - header.bottom) {
                        position = 'bottom';
                    } else {
                        position = 'middle';
                    }

                    if (header.position == 'top' && position == 'top' && direction == "UP") {
                        header.$parent.css('paddingTop', '');
                        header.$back.css({
                            'display': 'block',
                            'height': header.height,
                            'background': header.$.css('background-color')
                        });

                        var obj = {};
                        obj[position] = header[position];
                        header.$.animate(obj, {
                            duration: 40,
                            queue: false
                        });
                    }
                    if (position && position != 'middle') {
                        // Don’t do anything if the header is already positioned properly.
                        if (header.position != position) {
                            header.$parent.css('paddingTop', header.height);
                            header.$
                                .css('position', 'absolute')
                                .css(position, position == 'top' ? header.$parent.position().top : header[position])
                                .css(position == 'top' ? 'bottom' : 'top', '');
                            header.position = position;

                            if (position == 'top') {
                                var obj = {};
                                obj[position] = header[position];
                                header.$.animate(obj, {
                                    duration: 100,
                                    queue: false
                                });
                            }
                        }
                    }
                    else {
                        if (header.position != 'top' || position != 'top') {
                            header.$back.hide();
                        }
                        header.$parent.css('paddingTop', '');
                        header.$.css('position', '');
                        header.position = position;
                    }

                    if (position == 'bottom' && header.position == 'bottom') {
                        //var headerPosition = $scroller.scrollTop() < 15 ? position + 'Full' : position;
                        var headerPosition = position;
                        header.$parent.css('paddingTop', header.height);
                        header.$
                            .css('position', 'absolute')
                            .css(position == 'top' ? 'bottom' : 'top', '');
                        header.position = position;

                        var obj = {};
                        obj[position] = header[headerPosition];
                        header.$.animate(obj, {
                            duration: 40,
                            queue: false
                        });
                    }
                });
            }

            function init() {
                scrollerHeight = $scroller.outerHeight();
                headers = [];
                $sections = $scroller.children();
                $sections.each(function () {
                    var $section = $(this);
                    var $header = $section.children().first();
                    headers.push({
                        $: $header,
                        $parent: $section,
                        $back: $section.find('.back-header'),
                        height: $header.outerHeight(),
                        position: '' // can be 'top' or 'bottom'
                    });
                    $header.hover(
                        function () {
                            recalcHeaders($(this));
                            refresh();
                        },
                        function () {
                            recalcHeaders();
                            refresh();
                        });
                });

                // Pre-calculate the offsets that the headers would have
                // from the top or bottom of the scroller.
                headers.forEach(function (header, i) {
                    header.top = i > 0 ? (headers[i - 1].top + headers[i - 1].height / 2) : 0;

                    var j = headers.length - i - 1;
                    headers[j].bottom = j < headers.length - 1 ? (headers[j + 1].bottom + headers[j + 1].height / 2) : -headers[j].height / 2;
                    headers[j].bottomFull = j < headers.length - 1 ? (headers[j + 1].bottomFull + headers[j + 1].height) : 0;
                });

                refresh();
            }

            function recalcHeaders(hoverElem) {
                var prevHover = false;
                headers.forEach(function (header, i) {
                    if (hoverElem && header.$[0] === hoverElem[0]) {
                        header.top = i > 0 ? (headers[i - 1].top + headers[i - 1].height / 2) : 0;
                        prevHover = true;
                    } else {
                        header.top = i > 0 ? (headers[i - 1].top + (prevHover ? headers[i - 1].height : headers[i - 1].height / 2)) : 0;
                        prevHover = false;
                    }

                    var j = headers.length - i - 1;
                    if (hoverElem && headers[j].$[0] === hoverElem[0]) {
                        headers[j].bottom = j < headers.length - 1 ? (headers[j + 1].bottom + headers[j + 1].height) : 0;
                    } else {
                        headers[j].bottom = j < headers.length - 1 ? (headers[j + 1].bottom + headers[j + 1].height / 2) : -headers[j].height / 2;
                    }
                    headers[j].bottomFull = j < headers.length - 1 ? (headers[j + 1].bottomFull + headers[j + 1].height) : 0;
                });
            }

            function enablePointerEvents() {
                $sections.css('pointer-events', '');
                timer = undefined;
            }

            init();

            $scroller
                .on('wheel.' + pluginName, function () {
                    if (timer) {
                        clearTimeout(timer);
                    }
                    else {
                        $sections.css('pointer-events', 'none');
                    }
                    timer = setTimeout(enablePointerEvents, 100);
                })
                .on('scroll.' + pluginName, refresh);

            // On window resize we need to recalculate everything in case relative
            // units where used anywhere.
            $(window).on('resize.' + pluginName, init);

            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
            if (MutationObserver) {
                var observer = new MutationObserver(init);
                observer.observe($scroller[0], {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }

            $element.on('remove.' + pluginName, function () {
                $scroller.off('wheel.' + pluginName + ' scroll.' + pluginName);
                $(window).off('resize.' + pluginName, init);
                if (observer) {
                    observer.disconnect();
                }
            });
        });
    };
}(jQuery, window));