# reactNative 环境搭建
> 链接🔗: [react native 官网](https://reactnative.cn/docs/getting-started.html)

到 `yarn ios` 时报错

```
error Could not find "Podfile.lock" at /Users/ayi/code/myself/memory/ios/Podfile.lock. Did you run "pod install" in iOS directory?
info Found Xcode project "memory.xcodeproj"
xcrun: error: unable to find utility "simctl", not a developer tool or in PATH
error Could not get the simulator list from Xcode. Please open Xcode and try running project directly from there to resolve the remaining issues. Run CLI with --verbose flag for more details.
Error: Command failed: xcrun simctl list --json devices
```

此时, 进入项目下的 ios 目录, 运行 `pod install`

又出现如下错误: glog 脚本报错

```
[!] /bin/bash -c
set -e
#!/bin/bash
# Copyright (c) Facebook, Inc. and its affiliates.
#
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

set -e

PLATFORM_NAME="${PLATFORM_NAME:-iphoneos}"
CURRENT_ARCH="${CURRENT_ARCH}"

if [ -z "$CURRENT_ARCH" ] || [ "$CURRENT_ARCH" == "undefined_arch" ]; then
    # Xcode 10 beta sets CURRENT_ARCH to "undefined_arch", this leads to incorrect linker arg.
    # it's better to rely on platform name as fallback because architecture differs between simulator and device

    if [[ "$PLATFORM_NAME" == *"simulator"* ]]; then
        CURRENT_ARCH="x86_64"
    else
        CURRENT_ARCH="armv7"
    fi
fi

export CC="$(xcrun -find -sdk $PLATFORM_NAME cc) -arch $CURRENT_ARCH -isysroot $(xcrun -sdk $PLATFORM_NAME --show-sdk-path)"
export CXX="$CC"

# Remove automake symlink if it exists
if [ -h "test-driver" ]; then
    rm test-driver
fi

./configure --host arm-apple-darwin

# Fix build for tvOS
cat << EOF >> src/config.h
/* Add in so we have Apple Target Conditionals */
#ifdef __APPLE__
#include <TargetConditionals.h>
#include <Availability.h>
#endif
/* Special configuration for AppleTVOS */
#if TARGET_OS_TV
#undef HAVE_SYSCALL_H
#undef HAVE_SYS_SYSCALL_H
#undef OS_MACOSX
#endif
/* Special configuration for ucontext */
#undef HAVE_UCONTEXT_H
#undef PC_FROM_UCONTEXT
#if defined(__x86_64__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__rip
#elif defined(__i386__)
#define PC_FROM_UCONTEXT uc_mcontext->__ss.__eip
#endif
EOF

# Prepare exported header include
EXPORTED_INCLUDE_DIR="exported/glog"
mkdir -p exported/glog
cp -f src/glog/log_severity.h "$EXPORTED_INCLUDE_DIR/"
cp -f src/glog/logging.h "$EXPORTED_INCLUDE_DIR/"
cp -f src/glog/raw_logging.h "$EXPORTED_INCLUDE_DIR/"
cp -f src/glog/stl_logging.h "$EXPORTED_INCLUDE_DIR/"
cp -f src/glog/vlog_is_on.h "$EXPORTED_INCLUDE_DIR/"

checking for a BSD-compatible install... /usr/bin/install -c
checking whether build environment is sane... yes
checking for arm-apple-darwin-strip... no
checking for strip... strip
checking for a thread-safe mkdir -p... ./install-sh -c -d
checking for gawk... no
checking for mawk... no
checking for nawk... no
checking for awk... awk
checking whether make sets $(MAKE)... yes
checking whether make supports nested variables... yes
checking for arm-apple-darwin-gcc... /Library/Developer/CommandLineTools/usr/bin/cc -arch armv7 -isysroot
checking whether the C compiler works... no
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: SDK "iphoneos" cannot be located
xcrun: error: unable to lookup item 'Path' in SDK 'iphoneos'
/Users/ayi/Library/Caches/CocoaPods/Pods/Release/Flipper-Glog/0.3.6-1dfd6/missing: Unknown `--is-lightweight' option
Try `/Users/ayi/Library/Caches/CocoaPods/Pods/Release/Flipper-Glog/0.3.6-1dfd6/missing --help' for more information
configure: WARNING: 'missing' script is too old or missing
configure: error: in `/Users/ayi/Library/Caches/CocoaPods/Pods/Release/Flipper-Glog/0.3.6-1dfd6':
configure: error: C compiler cannot create executables
See `config.log' for more details
```

原因是因为没有设置默认使用的 Xcode.

执行如下命令, `pod install` 成功安装

```
xcode-select -p // 查看系统默认 xcode
sudo xcode-select --switch /Applications/Xcode.app // 更改系统默认 xcode
```

