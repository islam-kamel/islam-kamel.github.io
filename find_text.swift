import Cocoa
import Vision

guard let imgPath = CommandLine.arguments.dropFirst().first else { exit(1) }
guard let img = NSImage(contentsOfFile: imgPath) else { exit(1) }
guard let cgImage = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { exit(1) }

let request = VNRecognizeTextRequest { (request, error) in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for obs in observations {
        guard let candidate = obs.topCandidates(1).first else { continue }
        let box = obs.boundingBox
        // Bounding box is normalized (0 to 1), origin is bottom-left
        let x = box.origin.x * CGFloat(cgImage.width)
        let y = (1 - box.origin.y - box.height) * CGFloat(cgImage.height)
        let w = box.width * CGFloat(cgImage.width)
        let h = box.height * CGFloat(cgImage.height)
        print("\(candidate.string) | \(x),\(y),\(w),\(h)")
    }
}
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try? handler.perform([request])
