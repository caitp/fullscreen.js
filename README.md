#Fullscreen.js

Fullscreen.js is a simple wrapper for using [Fullscreen API](http://fullscreen.spec.whatwg.org/) in browsers.

This allows one to work around the various vendor-prefixed implementations of the API, and provides some convenience routines for listening for ctrl+f or cmd+f to toggle fullscreen mode.

More useful features may be added if they seem useful --- contributions are more than welcome.

##Usage

<table>
    <thead>
        <tr>
            <th>Method</th>
            <th>Arguments</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>$fullscreen.listen()</code></td>
            <td></td>
            <td>Start listening for ctrl+f or cmd+f in order to toggle fullscreen
                mode --- listens on document.</td>
        </tr>
        <tr>
            <td><code>$fullscreen.deafen()</code></td>
            <td></td>
            <td>Stop listening for key events</td>
        </tr>
        <tr>
            <td><code>$fullscreen.enter()</code></td>
            <td>
                <ol><li><code>node<Element></code> (optional)
                    <li><code>flags<number></code> (optional)
                </ol>
            </td>
            <td>Request fullscreen mode for a given element (or the document element if omitted),
                optionally with <a href="https://developer.apple.com/library/safari/documentation/WebKit/Reference/ElementClassRef/Element/Element.html">flags</a>
            </td>
        </tr>
        <tr>
            <td><code>$fullscreen.exit()</code></td>
            <td></td>
            <td>Exits (cancels) fullscreen mode for the current fullscreen element, if any</td>
        </tr>
        <tr>
            <td><code>$fullscreen.toggle()</code></td>
            <td></td>
            <td>Exits (cancels) fullscreen mode if there is a current fullscreen element, or requests fullscreen mode if there isn't.</td>
        </tr>
    </tbody>
</table>

##License

(c) 2014 Caitlin Potter & Contributors

Fullscreen.js is MIT-licensed. See [LICENSE](LICENSE) for details.
