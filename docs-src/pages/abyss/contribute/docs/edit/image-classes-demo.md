---
uid: Abyss.Contribute.Docs.Edit.ImageClassesDemo
---
# Image Classes Demos

Here you will find demos for the available image classes to easily style your images when contributing to the docs.

The following classes are supported and ready to use:

- [`full-width`](#full-width) - makes the image span the full width with shadow and rounded corners
- [`feature`](#feature) - limits height for feature images (max 100px)
- [`float-right`](#float-right) - floats the image to the right with left margin
- [`right-thumbnail`](#right-thumbnail) - floats a smaller thumbnail to the right
- [`float-left`](#float-left) - floats the image to the left with right margin
- [`glow`](#glow) - adds a subtle shadow and rounded corners

_Note, that you can combine multiple classes._

---

## Full Width

The `full-width` class will responsively scale the image to the available container width and adds a subtle shadow with rounded corners.

```markdown
<img src="./assets/image.png" class="full-width">
```

```css
img.full-width {
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin: 10px 0;
}
```

**Result `full-width`**

<img src="./assets/image.png" class="full-width">

---

## Feature

The `feature` class limits the height of images to a maximum of 100px while maintaining the aspect ratio. This is useful for logo or feature highlights.

```markdown
<img src="./assets/image.png" class="feature">
```

```css
img.feature {
  max-width: 100%;
  max-height: 100px;
}
```

**Result `feature`**

<img src="./assets/image.png" class="feature">

---

## Float Right

The `float-right` class floats the image to the right side with proper margins on the left and bottom.

```markdown
<img src="./assets/image.png" class="float-right">
```

```css
img.float-right {
  float: right;
  margin-left: 20px;
  margin-bottom: 5px;
}
```

**Result `float-right`**

<div style="overflow: auto;">
<img src="./assets/image.png" class="float-right">

This is example text showing how the float-right class works. The image will appear on the right side of this text. Notice how the text wraps around the image. This is especially useful for creating a visual flow in your documentation where you want text to accompany an image without taking up too much vertical space.
</div>

<div style="clear: both;"></div>

---

## Right Thumbnail

The `right-thumbnail` class floats a smaller thumbnail (25% width) to the right side with proper margins.

```markdown
<img src="./assets/image.png" class="right-thumbnail">
```

```css
img.right-thumbnail {
  float: right;
  margin-left: 20px;
  margin-bottom: 5px;
  width: 25%;
}
```

**Result `right-thumbnail`**

<div style="overflow: auto;">
<img src="./assets/image.png" class="right-thumbnail">

This demonstrates the right-thumbnail class. The image appears as a small thumbnail on the right side, taking up only 25% of the width. This is perfect for reference images that need to be visible but shouldn't dominate the layout.
</div>

<div style="clear: both;"></div>

---

## Float Left

The `float-left` class floats the image to the left side with proper margins on the right and bottom.

```markdown
<img src="./assets/image.png" class="float-left">
```

```css
img.float-left {
  float: left;
  margin-right: 20px;
  margin-bottom: 5px;
}
```

**Result `float-left`**

<div style="overflow: auto;">
<img src="./assets/image.png" class="float-left">

This example shows the float-left class in action. The image appears on the left side with text flowing around it. This creates a nice visual balance and is useful when you want to lead with an image followed by explanatory text.
</div>

<div style="clear: both;"></div>

---

## Glow

The `glow` class adds a subtle shadow and rounded corners to an image without changing its size or position.

```markdown
<img src="./assets/image.png" class="glow">
```

```css
img.glow {
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin: 10px 0;
}
```

**Result `glow`**

<img src="./assets/image.png" class="glow">