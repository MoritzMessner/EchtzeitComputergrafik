# EchtzeitComputergrafik

Repository für das Wahlpflichtmodul Echtzeitcomputergrafik an der Hochschule Furtwangen

---
Anbei eine kurze Erläuterung zu der Abschlussabgabe für dieses Modul.

## Technologien

- [ThreeJS](https://threejs.org/)
- [jQuery](https://jquery.com/)
- [simplex-noise.js](https://github.com/jwagner/simplex-noise.js)

---

## Klasse Audio

Um in meinem Projekt die Audiodateien Live zu analysieren habe ich das
Interface [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) verwendet. Mithilfe dieses
Interfaces kann ich zum Beispiel auch Audio welches von den Tags ````<video>```` oder ````<audio>```` kommt,
manipulieren. Das ganze basiert auf einen Graphen, hierbei kann man einfach neue
"Nodes" erstellen und zusammenschließen. Deswegen erzeuge ich mir einen Analyser und schließe diesen an den AudioContext
an. Anschließend wird noch die genauigkeit der Fast Fourier Transform eingestellt. Und nun kann man schon loslegen, wenn
man nun eine Audiodatei analysiert, bekommt man die verschiedenen Frequenzen mit welchen man weiterarbeiten kann.

Ich habe hierfür eine Schnittstelle entworfen, welche die Arbeit mit der Web Audio API erleichtern soll. Hierfür gibt es
viele statische Methoden um zu verhindern, dass die Klasse Instanziiert wird.

Die init Methode der Klasse Audio soll initilaisierungsarbeiten und weitere Methodenaufrufe vornehmen, dafür habe ich
keinen Konstruktor verwendet da in Konstruktoren keine Methodenaufrufe stehen sollten. Ein Konstruktor sollte nur für
die initialisierung von Werten verwendet werden.

---

## Klasse Geometrie

Ähnlich wie bei dem Audio, habe ich für Geometrie eine Schnittstelle entworfen. Hierbei sind auch alle Methoden wieder
statisch. Alle Methoden in der Klasse "Geometry" sind kleine Hilfsfunktionen welche den Umgang mit verschiedener
Geometrie erleichtern. Mithilfe dieser Funktionen wird verschiedenste Geometrie erzeugt oder manipuliert. Man kann
Punktwolken, Wireframes und ein Mandala generieren. Auch befindet sich hier die Methode welche für die manipulation der
einzelnen "vertecies" zuständig ist. Hierfür iteriere ich in dieser Methode über jeden Vertex eines Meshes welches per
Referenz an diese Methode übergeben wird und manipuliere dessen Position. Mithilfe
von [simplex-noise.js](https://github.com/jwagner/simplex-noise.js) werden neue Positionen für die Vertices erechnet und
diese dann verschoben. Nun muss dem "renderer" noch mitgeteilt werden, dass die Vertices Positionen neu bestimmt wurden
und dieser diese bitter updaten soll. Genau das gleiche muss auch für die Normalen gemacht werden.

---

## start.js

In diesem Javascript-File wird bestimmt welcher Style und welches Mesh in die Szene hinzugefügt wird. Hierbei wird aus
der Datei ```index.html``` die Funktion ```window.start``` aufgerufen. Diese Funktion erhält einen den
Parameter ```style: string``` welcher den textlichen Style enthält. Dieser Style wird dann an die Funktion
````switchStyle```` weiter delegiert. Diese Funktion bestimmt anhand des übergebenen Strings was in der Szene gezeigt
werden soll und welche Hintergrundfarbe verwendet werden soll.
