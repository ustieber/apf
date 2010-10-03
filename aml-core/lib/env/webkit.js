require.modify(
    "aml-core", 
    "aml-core/w3c", 
    ["aml-core", "aml-core/util/htmlentities"]
    function(amlCore, htmlEntities){

var serializer = new XMLSerializer();
amlCore.insertHtmlNodes = function(nodeList, htmlNode, beforeNode) {
    var node,
        frag = document.createDocumentFragment(),
        a = [], i = 0, l = nodeList.length;
    for (; i < l; i++) {
        if (!(node = nodeList[i])) continue;
        frag.appendChild(node);
    }

    (beforeNode || htmlNode).insertAdjacentHTML(beforeNode
        ? "beforebegin"
        : "beforeend", htmlEntities.html_entity_decode(serializer.serializeToString(frag))
            .replace(/<([^>]+)\/>/g, "<$1></$1>"));
};

amlCore.insertHtmlNode = function(xmlNode, htmlNode, beforeNode, s) {
    if (htmlNode.nodeType != 11 && !htmlNode.style)
        return htmlNode.appendChild(xmlNode);
    
    if (!s) {
        s = htmlEntities.html_entity_decode(xmlNode.serialize 
            ? xmlNode.serialize(true)
            : ((xmlNode.nodeType == 3 || xmlNode.nodeType == 4 || xmlNode.nodeType == 2)
                ? xmlNode.nodeValue
                : serializer.serializeToString(xmlNode)));
    }
    
    (beforeNode || htmlNode).insertAdjacentHTML(beforeNode
        ? "beforebegin"
        : "beforeend", s.replace(/<([^>]+)\/>/g, "<$1></$1>"));

    return beforeNode ? beforeNode.previousSibling : htmlNode.lastChild;
};

    }
);