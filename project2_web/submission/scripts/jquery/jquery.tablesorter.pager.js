(function ($) {
    $.extend({
        tablesorterPager: new function () {

            function updatePageDisplay(c, table) {
                var tablePagerId = "#" + $(table).attr('id') + "_pager";
                if (c.totalPages > 2) {
                    $(tablePagerId).find('.jumpToPageArea').show();
                }
                else {
                    $(tablePagerId).find('.jumpToPageArea').hide();
                }

                if (c.totalRows <= 2) {
                    c.container.css({
                        display: 'none'
                    });
                    
                } else {

                    if (c.totalPages == 1) {
                        $(c.cssFirst, c.container).css({ display: 'none' });
                        $(c.cssPrev, c.container).css({ display: 'none' });
                        $(c.cssNext, c.container).css({ display: 'none' });
                        $(c.cssLast, c.container).css({ display: 'none' });
                    } else if (c.page == 0) {
                        $(c.cssFirst, c.container).css({ display: 'none' });
                        $(c.cssPrev, c.container).css({ display: 'none' });
                        $(c.cssNext, c.container).css({ display: '' });
                        $(c.cssLast, c.container).css({ display: '' });
                    } else if (c.page == (c.totalPages - 1)) {
                        $(c.cssFirst, c.container).css({ display: '' });
                        $(c.cssPrev, c.container).css({ display: '' });
                        $(c.cssNext, c.container).css({ display: 'none' });
                        $(c.cssLast, c.container).css({ display: 'none' });
                    }
                    else {
                        $(c.cssFirst, c.container).css({ display: '' });
                        $(c.cssPrev, c.container).css({ display: '' });
                        $(c.cssNext, c.container).css({ display: '' });
                        $(c.cssLast, c.container).css({ display: '' });
                    }

                    $(c.cssPageDisplay, c.container).html("Page " + (c.page + 1) + " of " + c.totalPages);

                    if ((c.page + 1) == 1) {
                        if (c.size < c.totalRows)
                            $(c.cssShowingDisplay, c.container).html("Showing " + (c.page + 1) + " - " + c.size + c.seperator + c.totalRows);
                        else
                            $(c.cssShowingDisplay, c.container).html("Showing " + (c.page + 1) + " - " + c.totalRows + c.seperator + c.totalRows);
                    }
                    else {
                        if ((c.size * (c.page + 1)) < c.totalRows)
                            $(c.cssShowingDisplay, c.container).html("Showing " + (c.page * c.size + 1) + " - " + (c.size * (c.page + 1)) + c.seperator + c.totalRows);
                        else
                            $(c.cssShowingDisplay, c.container).html("Showing " + (c.page * c.size + 1) + " - " + c.totalRows + c.seperator + c.totalRows);
                    }
                }
            }

            function setPageSize(table, size) {
                var c = table.config;
                c.size = size;
                c.totalPages = Math.ceil(c.totalRows / c.size);
                c.pagerPositionSet = false;
                moveToPage(table);
                fixPosition(table);
            }

            function fixPosition(table) {
                var c = table.config;
                if (!c.pagerPositionSet && c.positionFixed) {
                    var c = table.config, o = $(table);
                    if (o.offset) {
                        c.container.css({
                            top: o.offset().top + o.height() + 'px',
                            position: 'absolute'
                        });
                    }
                    c.pagerPositionSet = true;
                }
            }

            function moveToFirstPage(table) {
                var c = table.config;
                c.page = 0;
                moveToPage(table);
            }

            function moveToLastPage(table) {
                var c = table.config;
                c.page = (c.totalPages - 1);
                moveToPage(table);
            }

            function moveToNextPage(table) {
                var c = table.config;
                c.page++;
                if (c.page >= (c.totalPages - 1)) {
                    c.page = (c.totalPages - 1);
                }
                moveToPage(table);
            }

            function moveToPrevPage(table) {
                var c = table.config;
                c.page--;
                if (c.page <= 0) {
                    c.page = 0;
                }
                moveToPage(table);
            }

            function jumpToPage(table) {
                var c = table.config;
                var newPage = parseInt($(table).next('.databasePager')
                                               .find('.jumpToPageVal')
                                               .val());

                var nanReg = /^\d*[0-9]/;
                if (!nanReg.test(newPage)) {
                    GlobalNotify("Please enter only numbers.");
                    return;
                }
                else if (newPage > c.totalPages || newPage < 1) {
                    GlobalNotify("Please enter a page number between 1 and " + (c.totalPages) + ".");
                    return;
                }
                else {
                    c.page = newPage - 1;
                    moveToPage(table);
                }
            }

            function moveToPage(table) {
                var c = table.config;
                if (c.page < 0 || c.page > (c.totalPages - 1)) {
                    c.page = 0;
                }

                renderTable(table, c.rowsCopy);
            }

            function renderTable(table, rows) {
                var c = table.config;
                var l = rows.length;
                var s = (c.page * c.size);
                var e = (s + c.size);
                if (e > rows.length) {
                    e = rows.length;
                }


                var tableBody = $(table.tBodies[0]);

                // clear the table body

                $.tablesorter.clearTableBody(table);

                for (var i = s; i < e; i++) {

                    //tableBody.append(rows[i]);

                    var o = rows[i];
                    var l = o.length;
                    for (var j = 0; j < l; j++) {

                        tableBody[0].appendChild(o[j]);

                    }
                }

                fixPosition(table, tableBody);

                $(table).trigger("applyWidgets");

                if (c.page >= c.totalPages) {
                    moveToLastPage(table);
                }

                updatePageDisplay(c, table);
            }

            this.appender = function (table, rows) {

                var c = table.config;

                c.rowsCopy = rows;
                c.totalRows = rows.length;
                c.totalPages = Math.ceil(c.totalRows / c.size);

                renderTable(table, rows);
            };

            this.defaults = {
                size: 10,
                offset: 0,
                page: 0,
                totalRows: 0,
                totalPages: 0,
                container: null,
                cssNext: '.next',
                cssPrev: '.prev',
                cssFirst: '.first',
                cssLast: '.lastpage',
                cssPageDisplay: '.pageCount',
                cssShowingDisplay: '.showingCount',
                cssPageSize: '.pagesize',
                cssJumpToPage: '.jumpToPageBtn',
                cssJumpInput: '.jumpToPageVal',
                seperator: " of ",
                positionFixed: false,
                appender: this.appender
            };

            this.construct = function (settings) {

                return this.each(function () {

                    config = $.extend(this.config, $.tablesorterPager.defaults, settings);

                    var table = this, pager = config.container;

                    $(this).trigger("appendCache");

                    config.size = parseInt($(".pagesize", pager).val());

                    $(config.cssFirst, pager).click(function () {
                        moveToFirstPage(table);
                        return false;
                    });
                    $(config.cssNext, pager).click(function () {
                        moveToNextPage(table);
                        return false;
                    });
                    $(config.cssPrev, pager).click(function () {
                        moveToPrevPage(table);
                        return false;
                    });
                    $(config.cssLast, pager).click(function () {
                        moveToLastPage(table);
                        return false;
                    });
                    $(config.cssPageSize, pager).change(function () {
                        setPageSize(table, parseInt($(this).val()));
                        return false;
                    });
                    $(config.cssJumpToPage, pager).click(function () {
                        jumpToPage(table);
                        return false;
                    });
                    (config.cssJumpToPage, pager).keydown(function (event) {
                        if (event.keyCode == 13) {
                            jumpToPage(table);
                            return false;
                        }
                    });
                    $(config.cssJumpInput, pager).focus(function () {
                        $(this).val('');
                        return false;
                    });
                    //mjs remove 8/4/2011.  Originally Blake added this in to allow end user to submit selections across multiple pages
                    //but it screwed up views that have more than one pager.  In that case, it is very random if what the user selects is what
                    //is actually submitted to controller on post.
                    //$('form').submit(function () {
                    //    setPageSize(table, config.totalRows);
                    //});
                });
            };

        }
    });
    // extend plugin scope
    $.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
    });

})(jQuery);