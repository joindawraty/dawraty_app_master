import Foundation
import ScreenShield

@objc(ScreenShieldRN)
class ScreenShieldRN: NSObject {

    @objc func protectScreenRecording() {
        ScreenShield.shared.protectFromScreenRecording()
    }

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }
}